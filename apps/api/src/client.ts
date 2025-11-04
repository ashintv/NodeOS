/*
  Redis Client for job processing and notifications
  --------------------------------------------------
  - Pushes jobs to Redis list: "engine_jobs"
  - Listens to notifications on: "engine_job_notifications"
  - Supports callback + timeout mechanism
*/

import { RedisClientType, redisClient } from "@repo/backend-core/redis";
import { Job } from "@repo/definitions/types";

export class EngineClient {
  private redisClient: RedisClientType;
  private subscriber: RedisClientType;
  private jobCallbacks = new Map<string, Function>();
  private listenerStarted = false;

  constructor() {
    this.redisClient = redisClient;
    this.subscriber = redisClient.duplicate();
    this.start();
  }

  /**
   * Connect to Redis and start listening for notifications
   */
  async start() {
    try {
      if (!this.redisClient.isOpen) await this.redisClient.connect();
      if (!this.subscriber.isOpen) await this.subscriber.connect();
      await this.setupNotificationListener();
      console.log("[EngineClient] Connected to Redis and listener started");
    } catch (err) {
      console.error("[EngineClient] Redis connection error:", err);
    }
  }

  /**
   * Subscribe to engine job notifications
   * Dispatch callbacks based on job ID
   */
  private async setupNotificationListener() {
    if (this.listenerStarted) return;
    this.listenerStarted = true;

    await this.subscriber.subscribe("engine_job_notifications", async (message) => {
      try {
        const notification = JSON.parse(message);
        const callback = this.jobCallbacks.get(notification.id);
        if (callback) {
          callback(notification);
          // Remove callback once job is completed or failed
          if (["completed", "failed"].includes(notification.status)) {
            this.jobCallbacks.delete(notification.id);
          }
        }
      } catch (err) {
        console.error("[EngineClient] Failed to parse notification:", message, err);
      }
    });

    console.log("[EngineClient] Subscribed to 'engine_job_notifications'");
  }

  /**
   * Push a job to the Redis job queue
   */
  async sendJob(job: Job) {
    try {
      await this.redisClient.lPush("engine_jobs", JSON.stringify(job));
      console.log(`[EngineClient] Job queued: ${job.id}`);
    } catch (err) {
      console.error("[EngineClient] Failed to send job:", err);
    }
  }

  /**
   * Send a job and listen for its response using a callback
   * Includes a timeout mechanism (default: 2 minutes)
   */
  async sendAndListenToJob(job: Job, callback: Function, timeout = 2 * 60 * 1000) {
    // Register callback for job ID
    this.jobCallbacks.set(job.id, callback);

    // Ensure listener and send job
    await this.setupNotificationListener();
    await this.sendJob(job);

    // Timeout handling
    setTimeout(() => {
      if (this.jobCallbacks.has(job.id)) {
        console.warn(`[EngineClient] Job timed out: ${job.id}`);
        callback({
          id: job.id,
          status: "failed",
          error: "Job timed out",
        });
        this.jobCallbacks.delete(job.id);
      }
    }, timeout);
  }

  /**
   * Promise-based API for job handling 
   */
  async sendAndWait(job: Job, timeout = 2 * 60 * 1000): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.jobCallbacks.set(job.id, (notification: any) => {
        resolve(notification);
        this.jobCallbacks.delete(job.id);
      });

      await this.setupNotificationListener();
      await this.sendJob(job);

      setTimeout(() => {
        if (this.jobCallbacks.has(job.id)) {
          this.jobCallbacks.delete(job.id);
          reject({
            id: job.id,
            status: "failed",
            error: "Job timed out",
          });
        }
      }, timeout);
    });
  }

  /**
   * Gracefully close Redis connections
   */
  async stop() {
    try {
      await this.subscriber.unsubscribe("engine_job_notifications");
      await this.subscriber.quit();
      await this.redisClient.quit();
      this.jobCallbacks.clear();
      this.listenerStarted = false;
      console.log("[EngineClient] Connections closed");
    } catch (err) {
      console.error("[EngineClient] Error during shutdown:", err);
    }
  }
}

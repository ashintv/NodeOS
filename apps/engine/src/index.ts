import { redisClient, type RedisClientType } from "@repo/backend-core/redis";
import type { Job, JobNotification, TODO } from "@repo/definitions/types";
import { executeAIJob, executeGmailJob, executeTelegramJob } from "./nodes/action.js";

class Engine {
  private redisClient: RedisClientType;
  private publisher: RedisClientType;
  constructor() {
    this.redisClient = redisClient;
    this.publisher = redisClient.duplicate();
    this.init();
    this.start();
  }
  async init() {
    try {
      await this.redisClient.connect();
      console.log("Connecting to Redis...");
      await this.redisClient.ping();
      console.log("Redis client connected successfully");
      await this.publisher.connect();
      console.log("Redis publisher connected successfully");
    } catch (error) {
      console.log("Error connecting to Redis:", error);
    }
  }
  
  async start() {
    while (true) {
      const data = await this.redisClient.brPop("engine_jobs", 0);
      if (!data) continue;
      const job: Job = JSON.parse(data.element);
      console.log("Processing job:", job);
      await this.Notify({
        id: job.id,
        status: "in_progress",
        result: {},
      });
      try {
        let JobResult:Job;
        switch (job.type) {
          case "GMAIL":
            JobResult = await executeGmailJob(job);
            break;
          case "TELEGRAM":
            JobResult = await executeTelegramJob(job);
            break;
          case "AI":
            JobResult = await executeAIJob(job);
            break;
          default:
            throw new Error(`Unsupported job type: ${job.type}`);
        }
        await this.Notify({...JobResult, status: "completed" });
        console.log("Job completed successfully:", job.id);
      } catch (e) {
        console.log("Error processing job:", e);
        await this.Notify({
          ...job,
          status: "failed",
          error: e,
        });
      }
    }
  }
  async Notify(message: JobNotification): Promise<void> {
    await this.publisher.publish("engine_notifications", JSON.stringify({ message }));
  }
}

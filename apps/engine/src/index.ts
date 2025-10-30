import { redisClient, type RedisClientType } from "@repo/backend-core/redis";
import type { Job, JobNotification, TODO } from "@repo/definitions/types";

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
        switch (job.type) {
          case "GMAIL":
            // process gmail job
            // await excuteGmailJob(job , this.Notify);
            break;
          case "TELEGRAM":
            // process telegram job
            break;
          case "AI":
            // process ai job
            break;
          case "TOOL":
            // process tool job
            break;
          default:
            console.log("Unknown job type:", job.type);
        }
        await this.Notify({
          id: job.id,
          status: "completed",
          result: {},
        });
        console.log("Job completed successfully:", job.id);
      } catch (e) {
        console.log("Error processing job:", e);
        await this.Notify({
          id: job.id,
          status: "failed",
          result: {},
          error: e,
        });
      }
    }
  }
  async Notify(message: JobNotification): Promise<void> {
    await this.publisher.publish("engine_notifications", JSON.stringify({ message }));
  }
}

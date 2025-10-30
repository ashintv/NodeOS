
import { createClient , RedisClientType} from "redis";

const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export { redisClient };
export type { RedisClientType };

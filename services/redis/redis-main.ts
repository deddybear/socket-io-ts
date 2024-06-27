import { createClient } from "redis";
import { redisConfig } from "../../model/redis/redis-config";
import dotenv from "dotenv"

dotenv.config();

const CONFIG : redisConfig = {
    url: `redis://${process.env.APP_REDIS_HOST}:${process.env.APP_REDIS_PORT}`,
}

export const clientRedis = createClient(CONFIG)
import { Queue } from "bullmq"
import { redismanager } from "../redis/RedisManager.js"

export const submissionQueue = new Queue(
    "submissionQueue",
    {connection: redismanager.connection}
)
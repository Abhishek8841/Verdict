import { redismanager } from "../shared/redis/RedisManager.js";
import { processSubmission } from "./processors/submission.processor.js";
import { Worker } from "bullmq";

new Worker(
    "submissionQueue",
    processSubmission,
    { connection: redismanager.connection }
);
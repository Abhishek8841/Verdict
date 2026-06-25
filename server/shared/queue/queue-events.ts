import { QueueEvents } from "bullmq";
import { redismanager } from "../redis/RedisManager.js";

export const submissionQueueEvents = new QueueEvents(
    "submissionQueue",
    {
        connection: redismanager.connection
    }
);

await submissionQueueEvents.waitUntilReady();

submissionQueueEvents.on(
    "completed",
    ({ jobId }) => {
        console.log(
            `Job ${jobId} completed`
        );
    }
);

submissionQueueEvents.on(
    "failed",
    ({ jobId }) => {
        console.log(
            `Job ${jobId} failed`
        );
    }
);

submissionQueueEvents.on(
    "progress",
    ({ jobId, data }) => {
        console.log(jobId, data);
    }
);

submissionQueueEvents.on(
    "stalled",
    ({ jobId }) => {
        console.log(
            `Job ${jobId} stalled`
        );
    }
);
import { QueueEvents } from "bullmq";
import { redismanager } from "../../shared/redis/RedisManager.js";
import type { ServerMessageType } from "../ws/schema/server-message.schema.js";
import { submissionQueue } from "./submission.queue.js";
import { prisma } from "../../shared/db/prisma.js";
import { socketManager } from "../ws/socker-manager.js";
import type { submissionResultType } from "../../shared/types/submission-job-result.types.js";

export const submissionQueueEvents = new QueueEvents(
    "submissionQueue",
    {
        connection: redismanager.connection
    }
);

await submissionQueueEvents.waitUntilReady();
// awaiting in the top level thread -> works in esm (.js) imports
// waits for redis connection before registering events
// good for prod

submissionQueueEvents.on(
    "completed",
    ({ jobId, returnvalue }) => {
        console.log("queue event started")
        const data = (typeof returnvalue === "string" ? JSON.parse(returnvalue) : returnvalue) as submissionResultType;
        const sendSubmissionDoneMessage: ServerMessageType = {
            type: "submission_processed",
            payload: {
                submissionId: data.submissionId,
                submissionResult: data.submissionResult
            }
        };

        socketManager.sendToUser(data.userId, sendSubmissionDoneMessage);
        console.log(
            `Job ${jobId} completed`
        );
    }
);

submissionQueueEvents.on(
    "failed",
    async ({ jobId, failedReason }) => {
        const job = await submissionQueue.getJob(jobId);
        if (!job) return;
        const submission = await prisma.submission.findUnique({
            where: { id: job.data.submissionId },
            select: {
                status: true,
                userId: true
            }
        })
        if (!submission) return;
        const sendSubmissionDoneMessage: ServerMessageType = {
            type: "submission_processed",
            payload: {
                submissionId: job.data.submissionId,
                submissionResult: submission.status,
                error: failedReason
            }
        };

        socketManager.sendToUser(submission.userId, sendSubmissionDoneMessage);

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
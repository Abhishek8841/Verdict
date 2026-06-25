import { submissionQueueEvents } from "../shared/queue/queue-events.js";
import { redismanager } from "../shared/redis/RedisManager.js";
import { processSubmission } from "./processors/submission.processor.js";
import { Worker } from "bullmq";

const submission_worker = new Worker(
    "submissionQueue",
    processSubmission,
    { connection: redismanager.connection }
);

submission_worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`)
})

submission_worker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} failed`)
    console.log(err);
})

submission_worker.on("error", (err) => {
    console.error(
        "Worker crashed:",
        err
    );
});

submission_worker.on("stalled", jobId => {
    console.log(`Job ${jobId} stalled`);
})
// stalled jobs happen when worker vanishes before acknowledging the jobs status
// this can lead to idempotency issues 
// hit db before processing incase of payments and important ops

submission_worker.on("active", job => {
    console.log(
        `Processing ${job.id}`
    );
});
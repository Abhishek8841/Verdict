import { submissionQueue } from "./submission.queue.js";

class QueueManager {


    async addSubmission(
        submissionId: string
    ) {
        return submissionQueue.add(
            "execute",
            {
                submissionId
            },
            {
                attempts: 3,
                backoff: {
                    type: "exponential",
                    delay: 1000
                },
                removeOnComplete: 100,
                removeOnFail: 100,
            }
        );
    }


};

export const queueManager =
    new QueueManager();

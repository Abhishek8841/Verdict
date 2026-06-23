import { submissionQueue } from "./submission.queue.js";

class QueueManager {
    async addSubmission(
        submissionId: string
    ) {

        return submissionQueue.add(
            "execute",
            {
                submissionId
            }
        );
    }
};

export const queueManager =
    new QueueManager();

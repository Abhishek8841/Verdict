import type { Job } from "bullmq";
import { prisma } from "../../shared/db/prisma.js";
import { SubmissionStatus } from "../../shared/db/generated/prisma/enums.js";

export async function processSubmission(
    job: Job<{ submissionId: string }>
) {
    const id = job.data.submissionId;
    await prisma.submission.update(
        {
            where: { id },
            data: {
                status: SubmissionStatus.RUNNING
            }
        }
    );
    
    // docker 
}
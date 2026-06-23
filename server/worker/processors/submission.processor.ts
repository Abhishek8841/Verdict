import type { Job } from "bullmq";
import { prisma } from "../../shared/db/prisma.js";
import { SubmissionStatus } from "../../shared/db/generated/prisma/enums.js";

export async function processSubmission(
    job: Job<{ submissionId: string }>
) {
    const id = job.data.submissionId;
    console.log(id);
    const submission = await prisma.submission.update(
        {
            where: { id },
            data: {
                status: SubmissionStatus.RUNNING
            }
        }
    );
    await new Promise(r => setTimeout(r, 3000));
    //  docker
    await prisma.submission.update(
        {
            where: { id },
            data: {
                status: SubmissionStatus.ACCEPTED
            }
        }
    );

}
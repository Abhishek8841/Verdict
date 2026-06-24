import type { Job } from "bullmq";
import { prisma } from "../../shared/db/prisma.js";
import { SubmissionStatus } from "../../shared/db/generated/prisma/enums.js";
import { ExecutorFactory } from "../executor/executor.factory.js";
import { compareOutputs } from "../compare/output.comparator.js";

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
            },
            select: {
                language: true,
                code: true,
                id: true,
                userId: true,
                problem: {
                    select: {
                        id: true,
                        testCases: true
                    }
                }
            }
        }
    );
    try {
        const executor = ExecutorFactory.getExecutor(submission.language);
        for (const testcase of submission.problem.testCases) {
            const result = await executor.execute(submission.id, submission.code, testcase.input);
            if (result.status !== SubmissionStatus.SUCCESS) {
                await prisma.submission.update(
                    {
                        where: { id },
                        data: {
                            status: result.status,
                        }
                    }
                );
                return;
            }
            if (!compareOutputs(testcase.output, result.output)) {
                await prisma.submission.update(
                    {
                        where: { id },
                        data: {
                            status: SubmissionStatus.WRONG_ANSWER
                        }
                    }
                );
                return;
            }
        }
        await prisma.submission.update(
            {
                where: { id },
                data: {
                    status: SubmissionStatus.ACCEPTED
                }
            }
        );

        try {
            await prisma.solvedProblem.create({
                data: {
                    userId: submission.userId,
                    problemId: submission.problem.id,
                },
            });
        } catch (error) {
            console.log("Problem was already solved by the user " + error)
        }

    } catch (error) {
        await prisma.submission.update(
            {
                where: { id },
                data: {
                    status: SubmissionStatus.COMPILATION_ERROR
                }
            }
        );
    }
}
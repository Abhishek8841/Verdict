import { SubmissionStatus } from "../../../shared/db/generated/prisma/enums.js";
import { prisma } from "../../../shared/db/prisma.js";
import { queueManager } from "../../../shared/queue/queueManager.js";
import type { idType, slugType } from "../schema/problem.schema.js";
import type { submissionIdType, submitType } from "../schema/submission.schema.js";

export const submitService = async (submitPayload: submitType, id: string) => {
    const submission = await prisma.submission.create({
        data: {
            code: submitPayload.code,
            language: submitPayload.language,
            status: SubmissionStatus.PENDING,
            userId: id,
            problemId: submitPayload.problemId,
        }
    });
    await queueManager.addSubmission(submission.id);
    return submission;
}

export const getSubmissionService = async (slug: slugType) => {
    return await prisma.submission.findMany({
        where: {
            problem: { slug }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const getProblemSubmissionsForUsersService = async (slug: slugType, id: idType) => {
    return await prisma.submission.findMany({
        where: {
            problem: { slug },
            userId: id,
        }
    })
}

export const getSubmissionByIdOfSubmissionService = async (submissionId: submissionIdType) => {
    const submission = await prisma.submission.findUnique({
        where: {
            id: submissionId
        },
        select: {
            id: true,
            code: true,
            language: true,
            status: true,
            createdAt: true,
            problem: {
                select: {
                    title: true,
                    slug: true
                }
            }
        }
    })
    if (!submission)
        throw new Error("Submission not found");

    return submission;
}
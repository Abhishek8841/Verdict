import { prisma } from "../../../shared/db/prisma.js";
import type { idType, slugType } from "../schema/problem.schema.js";
import type { submitType } from "../schema/submission.schema.js";

export const submitService = async (submitPayload: submitType, id: string) => {
    return await prisma.submission.create({
        data: {
            code: submitPayload.code,
            language: submitPayload.language,
            status: submitPayload.status,
            userId: id,
            createdAt: new Date(),
            problemId: submitPayload.problemId,
        }
    })
}

export const getSubmissionService = async (slug: slugType) => {
    return await prisma.submission.findMany({
        where: {
            problem: { slug }
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
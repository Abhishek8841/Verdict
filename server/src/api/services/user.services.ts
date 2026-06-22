import { prisma } from "../../../shared/db/prisma.js"
import type { idType } from "../schema/problem.schema.js";

export const getUserSubmissionService = async (id: idType, slug: string) => {
    return await prisma.submission.findMany({
        where: {
            userId: id,
            problem: { slug }
        },
    });
}

export const getUserSolvedService = async (id: idType) => {
    return await prisma.solvedProblem.findMany({
        where: { userId: id },
        select: {
            id: true,
            solvedAt: true,
            userId: true,
            problem: true,
        }
    })
}

export const getUserSolvedCountService = async (id: idType) => {
    return await prisma.solvedProblem.count({ where: { userId: id } });
}
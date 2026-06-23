import { prisma } from "../../../shared/db/prisma.js"
import type { idType, slugType } from "../schema/problem.schema.js";

export const getUserSubmissionService = async (slug: slugType, id: idType) => {
    return await prisma.submission.findMany({
        where: {
            userId: id,
            problem: { slug }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}

export const getUserSolvedService = async (id: idType) => {
    return await prisma.solvedProblem.findMany({
        where: { userId: id },
        orderBy: {
            solvedAt: "desc",
        },
        select: {
            id: true,
            solvedAt: true,
            userId: true,
            problem: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    difficulty: true
                }
            },
        },
    })
}

export const getUserSolvedCountService = async (id: idType) => {
    return await prisma.solvedProblem.count({ where: { userId: id } });
}
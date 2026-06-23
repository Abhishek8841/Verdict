import { prisma } from "../../../shared/db/prisma.js"
import type { slugType } from "../schema/problem.schema.js";

export const allProblemService = async () => await prisma.problem.findMany();

export const displayProblemService = async (slug: slugType) => {
    const problem = await prisma.problem.findUnique({
        where: { slug },
        select: {
            id: true,
            title: true,
            description: true,
            difficulty: true,
            testCases: {
                where: {
                    isHidden: false
                }
            },
        }
    });
    if (!problem) throw new Error("Invalid Url");
    return problem;
}
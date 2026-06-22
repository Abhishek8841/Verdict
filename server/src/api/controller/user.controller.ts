import type { Request, Response } from "express";
import { idSchema, slugSchema } from "../schema/problem.schema.js";
import { getUserSolvedCountService, getUserSolvedService, getUserSubmissionService } from "../services/user.services.js";

export const usersSubmissionsController = async (req: Request, res: Response) => {
    try {
        const result1 = idSchema.safeParse(req.id);
        const result2 = slugSchema.safeParse(req.params.slug)
        if (!result1.success || !result2.success) return res.status(400).json({
            success: false,
            message: "Invalid user"
        })
        const id = result1.data;
        const slug = result2.data;
        const submissions = await getUserSubmissionService(slug, id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched users submissions",
            submissions
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        })
    }
}


export const solvedByUserListController = async (req: Request, res: Response) => {
    try {
        const result = idSchema.safeParse(req.id);
        if (!result.success) return res.status(400).json({
            success: false,
            message: "Invalid user"
        })
        const id = result.data;
        const solvedProblem = await getUserSolvedService(id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched users submissions",
            solvedList: solvedProblem
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        })
    }
}


export const totalSolvedByUserController = async (req: Request, res: Response) => {
    try {
        const result = idSchema.safeParse(req.id);
        if (!result.success) return res.status(400).json({
            success: false,
            message: "Invalid user"
        })
        const id = result.data;
        const totalSolved = await getUserSolvedCountService(id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched users submissions",
            total: totalSolved
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        })
    }
}
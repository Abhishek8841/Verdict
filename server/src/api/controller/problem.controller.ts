import type { Request, Response } from "express";
import { idSchema, slugSchema } from "../schema/problem.schema.js";
import { allProblemService, displayProblemService } from "../services/problem.services.js";

export const allProblems = async (req: Request, res: Response) => {
    try {
        // const result = idSchema.safeParse(req.id);
        // if (!result.success) return res.status(400).json({
        //     success: false,
        //     message: "Invalid user"
        // });

        const problems = await allProblemService();

        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the problems",
            problems,
        })
    } catch (error: unknown
    ) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        })
    }
}

export const getProblem = async (req: Request, res: Response) => {

    try {
        const result = slugSchema.safeParse(req.params.slug);
        if (!result.success) return res.status(400).json({
            success: false,
            message: "Unable to fetch the problems. Check the url."
        });

        const problem = await displayProblemService(result.data);

        res.status(200).json({
            success: true,
            message: "Successfully fetched the problems",
            problem,
        });
    } catch (error: unknown) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        })
    }
}
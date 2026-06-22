import type { Request, Response } from "express";
import { submitSchema } from "../schema/submission.schema.js";
import { idSchema, slugSchema } from "../schema/problem.schema.js";
import { getProblemSubmissionsForUsersService, getSubmissionService, submitService } from "../services/submission.services.js";

export const submitController = async (req: Request, res: Response) => {
    try {
        const result1 = submitSchema.safeParse(req.body);
        const result2 = idSchema.safeParse(req.id);
        if (!result1.success || !result2.success) return res.status(400).json({
            success: false,
            message: "Invalid inputs"
        });
        const submitPayload = result1.data;
        const id = result2.data;
        const submission = await submitService(submitPayload, id);
        return res.status(200).json({
            success: true,
            message: "Successfully submitted the problem",
            submission,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        })
    }
}

export const getProblemSubmissions = async (req: Request, res: Response) => {
    try {
        const result = slugSchema.safeParse(req.params.slug);
        if (!result.success) return res.status(400).json({
            success: false,
            message: "Unable to fetch the problems. Check the url."
        });
        const submissions = await getSubmissionService(result.data);
        return res.json({
            success: true,
            message: "Successfully fetched all the submissions",
            submissions,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        })
    }
}

export const getProblemSubmissionsForUser = async (req: Request, res: Response) => {
    try {
        const result1 = slugSchema.safeParse(req.params.slug);
        const result2 = idSchema.safeParse(req.id);
        if (!result1.success || !result2.success) return res.status(400).json({
            success: false,
            message: "Unable to fetch your Submissions"
        });

        const submissions = await getProblemSubmissionsForUsersService(result1.data, result2.data);
        return res.json({
            success: true,
            message: "Successfully fetched your submissions",
            submissions,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        })
    }
}
import zod from "zod";
import { SubmissionStatus } from "../../../shared/db/generated/prisma/enums.js";

export const sendSubmissionDoneSchema = zod.object({
    type: zod.literal("submission_processed"),
    payload: zod.object({
        submissionId: zod.string(),
        submissionResult: zod.enum(SubmissionStatus),
        error: zod.optional(zod.string()),
    })
})

export const sendSubmissionProgressSchema = zod.object({
    type: zod.literal("submission_progress"),
    payload: zod.object({
        submissionId: zod.string(),
        progressUpdate: zod.number(),
    })
})

export const serverMessageSchema =
    zod.discriminatedUnion("type", [
        sendSubmissionDoneSchema,
        sendSubmissionProgressSchema
    ]);

export type ServerMessageType =
    zod.infer<typeof serverMessageSchema>;
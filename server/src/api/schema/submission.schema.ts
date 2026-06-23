import z from "zod";
import { Language } from "../../../shared/db/generated/prisma/enums.js";


export const submitSchema = z.object({
    code: z.string(),
    language: z.enum(Language),
    problemId: z.string(),
})

export const submissionIdSchema = z.string();


export type submitType = z.infer<typeof submitSchema>;
export type submissionIdType = z.infer<typeof submissionIdSchema>;
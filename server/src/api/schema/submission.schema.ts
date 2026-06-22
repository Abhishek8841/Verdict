import z from "zod";
import { Language, SubmissionStatus } from "../../../shared/db/generated/prisma/enums.js";


export const submitSchema = z.object({
    code: z.string(),
    language: z.enum(Language),
    status: z.enum(SubmissionStatus),
    problemId: z.string(),
})

export type submitType = z.infer<typeof submitSchema>;
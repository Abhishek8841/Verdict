import type { SubmissionStatus } from "../../shared/db/generated/prisma/enums.js";

export interface ExecutionResult {
    status: SubmissionStatus,
    output: string,
    runtime: number,
    memory: number,
}
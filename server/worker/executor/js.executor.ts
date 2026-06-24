import { SubmissionStatus } from "../../shared/db/generated/prisma/enums.js";
import type { ExecutionResult } from "../types/execution-result.types.js";
import type { Executor } from "./executor.interface.js";

export class jsExecutor implements Executor {
    async execute(submissionId: string, code: string, input: string): Promise<ExecutionResult> {
        return {
            status: SubmissionStatus.ACCEPTED,
            output: "",
            runtime: 0,
            memory: 0,
        }
    }
}
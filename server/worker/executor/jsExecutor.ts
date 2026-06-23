import { SubmissionStatus } from "../../shared/db/generated/prisma/enums.js";
import type { ExecutionResult } from "../types/ExecutionResult.js";
import type { Executor } from "./Executor.js";

export class jsExecutor implements Executor {
    async execute(code: string, input: string): Promise<ExecutionResult> {
        return {
            status: SubmissionStatus.ACCEPTED,
            output: "",
            runtime: 0,
            memory: 0,
        }
    }
}
import type { ExecutionResult } from "../types/execution-result.types.js";

export interface Executor {
    execute(
        submissionId: string,
        code: string,
        input: string
    ): Promise<ExecutionResult>;
}
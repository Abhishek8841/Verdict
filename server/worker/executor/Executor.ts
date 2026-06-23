import type { ExecutionResult } from "../types/ExecutionResult.js";

export interface Executor {
    execute(code: string, input: string): Promise<ExecutionResult>
};
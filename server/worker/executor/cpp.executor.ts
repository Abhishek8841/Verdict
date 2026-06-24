import { SubmissionStatus } from "../../shared/db/generated/prisma/enums.js";
import { DockerManager } from "../docker/docker-manager.js";
import { tempFileManager } from "../docker/tempFileManager.js";
import type { ExecutionResult } from "../types/execution-result.types.js";
import type { Executor } from "./executor.interface.js";

export class cppExecutor implements Executor {
    async execute(submissionId: string, code: string, input: string): Promise<ExecutionResult> {
        const cppFile = await tempFileManager.createCodeFile(submissionId, code)
        const inputFile = await tempFileManager.creatTestFile(submissionId, input);

        try {

            const start = Date.now();
            const result = await DockerManager.runCpp(cppFile, inputFile);
            const runtime = Date.now() - start;
            let state: SubmissionStatus;
            switch (result.exitcode) {
                case 0:
                    state = SubmissionStatus.SUCCESS;
                    break;
                case 124:
                    state = SubmissionStatus.TLE;
                    break;
                case 137:
                    state = SubmissionStatus.MLE;
                    break;
                default:
                    state = SubmissionStatus.RUNTIME_ERROR;
                    break;
            }
            return {
                status: state,
                output: result.stdout,
                runtime,
                memory: 0,
            }
        }
        finally {
            await tempFileManager.cleanUp(cppFile, inputFile);
        }
    }
}
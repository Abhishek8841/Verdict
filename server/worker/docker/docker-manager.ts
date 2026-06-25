import { promisify } from "util";
import { exec } from "child_process";
import path from "path";
import { CPU_LIMIT, MEMORY_LIMIT } from "./limits.js";
import type { dockerExecutionResult } from "./docker.types.js";

const exe = promisify(exec);

export class DockerManager {
    static async runCpp(cppFilePath: string, inputFilePath: string): Promise<dockerExecutionResult> {
        const tempDir = path.dirname(cppFilePath);
        const cppFile = path.basename(cppFilePath);
        const inputFile = path.basename(inputFilePath);
        const executable = "program";
        const command = `docker run --rm --network none --memory=${MEMORY_LIMIT} --cpus=${CPU_LIMIT} --pids-limit=50 -v "${tempDir}:/app:ro" gcc:latest bash -c "g++ /app/${cppFile} -o /tmp/${executable} && timeout 2s /tmp/${executable} < /app/${inputFile}"`;
        try {
            const {
                stdout,
                stderr
            } =
                await exe(command);
            console.log("inside docker ")
            console.log("stdout is", stdout, stderr);
            return {
                stdout,
                stderr,
                exitcode: 0
            };

        } catch (error: any) {
            console.log(error);
            return {
                stdout:
                    error.stdout ?? "",
                stderr:
                    error.stderr ?? "",
                exitcode:
                    error.code ?? -1
            };
        }
    }
};
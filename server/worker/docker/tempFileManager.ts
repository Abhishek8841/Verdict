import path from "path";
import fs from "fs/promises";

export class tempFileManager {
    private static dir = path.join(
        process.cwd(),
        "temp"
    )

    static async createCodeFile(submissionId: string, code: string) {
        await fs.mkdir(this.dir, { recursive: true })
        const tempFilePath = path.join(
            this.dir,
            `${submissionId}.cpp`
        )
        await fs.writeFile(
            tempFilePath,
            code
        )
        return tempFilePath;
    }

    static async creatTestFile(submissionId: string, input: string) {
        await fs.mkdir(this.dir, { recursive: true })
        const tempFilePath = path.join(
            this.dir,
            `${submissionId}.txt`
        )
        await fs.writeFile(
            tempFilePath,
            input
        )
        return tempFilePath;
    }

    static async cleanUp(...files: string[]) {
        await Promise.all(files.map(file => fs.unlink(file).catch(() => { })));
    }
};


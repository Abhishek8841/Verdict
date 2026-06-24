import path from "path";
import fs from "fs/promises";

export class tempFileManage {
    private static dir = path.join(
        process.cwd(),
        "temp"
    )

    private static async createCodeFile(submissionId: string, code: string) {
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

    private static async creatTestFile(submissionId: string, input: string) {
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


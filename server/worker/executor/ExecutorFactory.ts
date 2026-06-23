import { Language } from "../../shared/db/generated/prisma/enums.js";
import { cppExecutor } from "./cppExecutor.js";
import type { Executor } from "./Executor.js";
import { jsExecutor } from "./jsExecutor.js";

export class ExecutorFactory {

    static getExecutor(
        language: Language
    ): Executor {

        switch (language) {
            case Language.CPP:
                return new cppExecutor();

            case Language.JAVASCRIPT:
                return new jsExecutor();

            default:
                throw new Error(`Unsupported language: ${language}`);
        }

    }

}
import type { SubmissionStatus } from "../db/generated/prisma/enums.js"

export type submissionResultType = {
    submissionId: string,
    submissionResult: SubmissionStatus,
    userId: string,
}
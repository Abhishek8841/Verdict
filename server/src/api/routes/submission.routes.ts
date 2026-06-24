import express from "express";
import { getProblemSubmissions, getProblemSubmissionsForUser, getSubmissionByIdOfSubmission, submitController } from "../controller/submission.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
const submissionRouter = express.Router();

submissionRouter.post("/problem/submit", authMiddleWare, submitController);
submissionRouter.get("/problem/submissions", authMiddleWare, getProblemSubmissions);
submissionRouter.get("/problem/submissions/user/:slug", authMiddleWare, getProblemSubmissionsForUser);
submissionRouter.get("/problem/submission/:id", authMiddleWare, getSubmissionByIdOfSubmission);

export default submissionRouter;
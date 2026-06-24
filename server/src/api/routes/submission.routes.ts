import express from "express";
import { submitController } from "../controller/submission.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
const submissionRouter = express.Router();

submissionRouter.post("/problem/submit", authMiddleWare, submitController);

export default submissionRouter;
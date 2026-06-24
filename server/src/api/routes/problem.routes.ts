import express from "express";
import { allProblems, getProblem } from "../controller/problem.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
const problemRouter = express.Router();

problemRouter.get("/problem/all", authMiddleWare, allProblems);
problemRouter.get("/problem/:slug", authMiddleWare, getProblem)

export default problemRouter;
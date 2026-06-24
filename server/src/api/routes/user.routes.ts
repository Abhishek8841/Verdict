import express from "express";
import { solvedByUserListController, totalSolvedByUserController, usersSubmissionsController } from "../controller/user.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
const userRouter = express.Router();

userRouter.get("/user/submission/:slug", authMiddleWare, usersSubmissionsController)
userRouter.get("/user/solved", authMiddleWare, solvedByUserListController);
userRouter.get("/user/solved/total", authMiddleWare, totalSolvedByUserController);


export default userRouter;
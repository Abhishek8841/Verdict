import express from "express";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";

import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import submissionRouter from "./routes/submission.routes.js";
import userRouter from "./routes/user.routes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", authRouter);
app.use("/api/v1", problemRouter);
app.use("/api/v1", submissionRouter);
app.use("/api/v1", userRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

export default app;
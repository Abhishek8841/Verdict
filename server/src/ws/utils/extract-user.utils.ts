import type { IncomingMessage } from "http";
import { parse } from "cookie";
import { env } from "../../config/env.js";
import jwt from "jsonwebtoken";


export const extractUserId = (req: IncomingMessage) => {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;
    if (!token) return null;
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (typeof payload === "string") return null;
    return payload.id as string;
}
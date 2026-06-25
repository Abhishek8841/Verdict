import type { IncomingMessage, Server } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { extractUserId } from "./utils/extract-user.utils.js";
import { socketManager } from "./socker-manager.js";


export function initWebSocketServer(server: Server) {
    const wss = new WebSocketServer({ server });


    wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
        console.log(req.headers);

        const id = extractUserId(req);
        console.log("userid is ", id)
        if (!id) {
            ws.close();
            return;
        }
        socketManager.addUserSocket(id, ws);
        ws.on("error", () => {
            ws.close();
        })

        ws.on("close", () => {
            socketManager.removeUserSocket(id, ws);
        })
    })
}
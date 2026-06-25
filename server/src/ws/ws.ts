import type { IncomingMessage, Server } from "http";
import WebSocket, { WebSocketServer } from "ws";
import { extractUserId } from "./utils/extract-user.utils.js";
import { socketManager } from "./socker-manager.js";


function initWebSocketServer(server: Server) {
    const wss = new WebSocketServer({ server });


    wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
        const id = extractUserId(req);
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
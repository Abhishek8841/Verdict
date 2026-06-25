import { WebSocket } from "ws";
import { serverMessageSchema, type ServerMessageType } from "./schema/server-message.schema.js";

class Socket_Manager {

    private submissionList: Map<string, Set<WebSocket>> = new Map();

    private constructor() { };

    private static instance: Socket_Manager;

    public static getInstance() {
        if (!this.instance)
            this.instance = new Socket_Manager();
        return this.instance;
    }

    addUserSocket(userId: string, socket: WebSocket) {
        if (!this.submissionList.has(userId))
            this.submissionList.set(userId, new Set());
        this.submissionList.get(userId)?.add(socket);
    }

    removeUserSocket(userId: string, socket: WebSocket) {
        const socketList = this.submissionList.get(userId);
        if (!socketList) return;
        socketList.delete(socket);
        if (socketList.size == 0)
            this.submissionList.delete(userId);
    }

    getUserSocket(userId: string) {
        const socketList = this.submissionList.get(userId);
        return socketList;
    }

    sendToUser(userId: string, payload: ServerMessageType) {
        const result = serverMessageSchema.safeParse(payload);
        if (!result.success) return;
        const userSockets = this.getUserSocket(userId);
        if (!userSockets) return;
        for (const socket of userSockets) {
            if (socket.readyState !== WebSocket.OPEN) {
                continue;
            }
            try {
                socket.send(JSON.stringify(result.data));
            } catch (error) {
                console.error(`Failed to send to user ${userId}`)
                socket.terminate();
                this.removeUserSocket(userId, socket);
            }
        }
    }
};

export const socketManager = Socket_Manager.getInstance();
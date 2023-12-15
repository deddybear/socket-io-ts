import { SocketNode } from "./socket-node";

export interface SocketHandlers {
    path : string,
    handler: SocketNode
}
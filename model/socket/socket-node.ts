// https://github.com/nickFelix/websocket-typescript/blob/main/resources/index.js

import { Socket } from "socket.io";

export interface SocketNode {
    handleConnection(socket : Socket): void;
    middleware?(socket: Socket, next: any): void
}

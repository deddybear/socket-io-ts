// https://github.com/nickFelix/websocket-typescript/blob/main/resources/index.js

import { Socket } from "socket.io";

export interface SocketNode {
    middleware?(socket: Socket, next: any): void;
    handleEmit(socket: Socket): void;
    handleReceiver?(socket: Socket): void;
    handleDisconnect(socket: Socket) : void;
}

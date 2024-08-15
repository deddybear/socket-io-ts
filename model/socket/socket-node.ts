// https://github.com/nickFelix/websocket-typescript/blob/main/resources/index.js

import { Socket } from "socket.io";
import { SocketMain } from "../../services/socket/socket-main";

export interface SocketNode {
    middleware?(socket: Socket, next: any): void;
    handleEmit(socket: Socket, io: SocketMain): void;
    handleReceiver?(socket: Socket, io: SocketMain): void;
    handleDisconnect(socket: Socket) : void;
}

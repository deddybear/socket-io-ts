import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketNode } from "../../model/socket/socket-node";


export class Hello implements SocketNode {
    handleConnection(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {

        socket.emit('test', 'test test')
    }
}
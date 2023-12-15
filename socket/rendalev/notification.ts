import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketNode } from "../../model/socket/socket-node";


export class Notification implements SocketNode {
    handleConnection(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
        socket.emit('ping', 'Hi Aku dari server 123 c')
        socket.emit('test1', 'Hi Aku dari server 123 ca')
    }
}
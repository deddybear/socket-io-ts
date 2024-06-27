import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketNode } from "../../../model/socket/socket-node";

export class Notification implements SocketNode {
    
    /** emit adalah sender atau Pengirim */
    handleEmit(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
        // socket.on('connection', socket => {
        //     console.log(`⚡: ${socket.id} user just connected`)
        // })

        try {
            socket.emit('ping', 'Hi Aku dari server 123 c', '')
        } catch (error) {
            console.log(error);
        }


    }

    /** On adalah Receiver atau Penerima */
    handleReceiver(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
        try {
            socket.on('listener_uuk', (data) => {
                socket.broadcast.emit("send_to_bidang", data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleDisconnect(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
        try {
            socket.on('disconnect', reason => {
                console.log(`⚡: ${reason} user just disconnect`);
            })
        } catch (error) {
            console.log(error);
        }
    }
}
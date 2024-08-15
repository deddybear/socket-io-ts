import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketNode } from "../../../model/socket/socket-node";

export class NotificationPatient implements SocketNode {

    /** 
     * emit adalah sender atau Pengirim 
     * mengirim dari server ke client
    */
    handleEmit(socket: Socket): void {

        /** ini tidak perlu di initsialisasi karena sudah pada file socket-main */
        // socket.on('connection', socket => { 
        //     console.log(`⚡: ${socket.id} user just connected`)
        // })

        try {
            /** parameter 1  */
            socket.emit('ping', 'Hi Aku dari server 123 c', '')
        } catch (error) {
            console.log(error);
        }


    }

    /** 
     * On adalah Receiver atau Penerima 
     * Penerima kiriman dari client
     * 
    */
    handleReceiver(socket: Socket): void {
        try {
            socket.on('listen_patient_baru', (data) => {
                socket.broadcast.emit('send', data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    /** jika server dengan client disconnect ataupun sebaliknya */
    handleDisconnect(socket: Socket): void {
        try {
            socket.on('disconnect', reason => {
                console.log(`⚡: ${reason} user just disconnect`);
            })
        } catch (error) {
            console.log(error);
        }
    }
}
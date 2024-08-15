import { Socket } from "socket.io";

import { SocketNode } from "../../../model/socket/socket-node";
import { SocketMain } from "../socket-main";

export class NotificationRendalev implements SocketNode {
    
    /** 
     * emit adalah sender atau Pengirim 
     * mengirim dari server ke client
    */
    handleEmit(socket: Socket, io: SocketMain): void {

        /** ini tidak perlu di initsialisasi karena sudah pada file socket-main */
        // socket.on('connection', socket => { 
        //     console.log(`⚡: ${socket.id} user just connected`)
        // })


        try {
            socket.emit('ping', 'Hi Aku dari server 123 c', '')
        } catch (error) {
            console.log(error);
        }


    }

    /** 
     * On adalah Receiver atau Penerima 
     * Penerima kiriman dari client 
     */
    handleReceiver(socket: Socket, io: SocketMain): void {
        try {

            socket.on('join_room_bidang', (data) => {
                socket.join(data.idBidang)
            })

            /** membuat event listen server bernama listener_uuk kepada server */
            socket.on('listener_uuk', (data) => {

                /** jika dia tidak punya room atau tujuan bidang_id */
                if (data.idBidang === "") {
                    
                    /** mengirim ke event listen client send_to_bidang */
                    socket.broadcast.emit("send_to_bidang", data)
                } else {
                    io.to(data.idBidang).emit('send_to_bidang', data)
                }

            })


        } catch (error) {
            console.log(error);
        }
    }

    /** jika server dengan client disconnect ataupun sebaliknya 
      * maka akan mengconsole-log ke server user just disconnect
    */
    handleDisconnect(socket: Socket): void {
        try {
            socket.on('disconnect', reason => {
                console.log(`⚡: ${reason} ${socket.id} user just disconnect`);
            })
        } catch (error) {
            console.log(error);
        }
    }
}
import { Server, Socket } from "socket.io";

import { SocketNode } from "../../../model/socket/socket-node";
import { dataSocket } from "../../../model/socket/notification-rendalev/data-socket";

export class NotificationRendalev implements SocketNode {
    
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
            socket.emit('ping', 'Hi Aku dari server 123 c', '')
        } catch (error) {
            /** tinggal diganti log slack */
            console.log(error);
        }


    }

    /** 
     * On adalah Receiver atau Penerima 
     * Penerima kiriman dari client 
     */
    handleReceiver(socket: Socket): void {
        try {
            
            /** room ini bisa dibuat untuk aliasisasi socket id agar bisa membantu mengirim data untuk room tertentu dan tidak bersifat broadcast */
            socket.on('join_room_bidang', (data: dataSocket) => {
                
                /** memasuki room */
                socket.join(data.idBidang)
                
                /** melemparkan umpan balik ke client yang listening event connectToRoom */
                socket.emit('connectToRoom', `Kamu sudah terhubung dengan room bidang ${data.idBidang}`)
            })

            /** membuat event listen server bernama listener_uuk kepada server */
            socket.on('listener_uuk', (data: dataSocket) => {
                
                /** jika dia tidak punya room atau tujuan bidang_id */
                if (data.idBidang === "") {
                    
                    /** mengirim ke event listen client send_to_bidang bersifat broadcast*/
                    socket.broadcast.emit("send_to_bidang", data)
                } else {               
                    /** mengirim ke event listen client send_to_bidang bersifat to room / private */
                    socket.to(data.idBidang).emit('send_to_bidang', data)
                }

            })


        } catch (error) {
            /** tinggal diganti log slack */
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
            /** tinggal diganti log slack */
            console.log(error);
        }
    }
}
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketNode } from "../../model/socket/socket-node";
import { TestJson } from "../../model/socket/app-test/test-json";


export class Hello implements SocketNode {
    
    /** emit adalah sender atau Pengirim */
    handleEmit(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {        
        

        socket.emit('test', 'test test avc')

        // const data : TestJson = {
        //     name : "John Smith", 
        //     age: 12, alive: 
        //     true
        // };

        // /** hanya untuk testing apakah kodingan kebawah sini */
        // console.log('ksesini');
        
        // socket.emit('testJson', data)
    }

    /** On adalah Receiver atau Penerima */
    handleReceiver(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
        /**
         * ! untuk parameter kedua tergantung dari sendernya ngirim berapa banyak
         */
        socket.on('Hello', (arg, callback) => {
            console.log(arg);
            
            callback("Hello From  Server");
        })
    }

    handleDisconnect(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
        socket.on('disconnect', reason => {
            console.log(`⚡: ${reason} user just disconnect`);
        })
    }
}
import { Server, Socket } from 'socket.io'
import { SocketHandlers } from '../../model/socket/socket-handler';
import { SocketConfig } from '../../model/socket/socket-config';

const WEBSOCKET_CONFIG : SocketConfig = {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
}


export class SocketMain extends Server {

    public static io: SocketMain;

    /** CORS UNTUK SOKCET  */
    constructor(httpServer: any) {
        super(httpServer, WEBSOCKET_CONFIG);
    }

    public static getInstance(httpServer? : any): SocketMain {
        
        if (!SocketMain.io) {
            SocketMain.io = new SocketMain(httpServer)
        }
        
        SocketMain.io.on('connection', (socket) => {
            console.log(`⚡: ID : ${socket.id} just connected`);
        });

        return SocketMain.io
    }

    /**
     * initialisasi handler setiap service socket.io
     * yang ada di baris code 44: io.initializeHandlers()
     */
    public initializeHandlers(socketHandlers: Array<SocketHandlers>) {
        socketHandlers.forEach(element => {
            let namespace = SocketMain.io.of(element.path, (socket: Socket) => {
                
                element.handler.handleEmit(socket, SocketMain.io);
                element.handler.handleDisconnect(socket);

                if (element.handler.handleReceiver) {
                    element.handler.handleReceiver(socket, SocketMain.io)
                }
            });


            if (element.handler.middleware) {
                namespace.use(element.handler.middleware);
            }
        });
    }
}
import { Server, Socket } from 'socket.io'
import { SocketHandlers } from '../model/socket/socket-handler';

const WEBSOCKET_CORS = {
    origin: "*",
    methods: ["GET", "POST"]
}

export class SocketMain extends Server {

    public static io: SocketMain;


    constructor(httpServer: any) {
        super(httpServer, {
            cors: WEBSOCKET_CORS
        });
    }


    public static getInstance(httpServer? : any): SocketMain {
        
        if (!SocketMain.io) {
            SocketMain.io = new SocketMain(httpServer)
        }

        return SocketMain.io
    }

    /**
     * name
     */
    public initializeHandlers(socketHandlers: Array<SocketHandlers>) {
        socketHandlers.forEach(element => {
            let namespace = SocketMain.io.of(element.path, (socket: Socket) => {
                element.handler.handleConnection(socket);
            });

            if (element.handler.middleware) {
                namespace.use(element.handler.middleware);
            }
        });
    }
}
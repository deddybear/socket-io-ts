import express, {Request, Response, Express} from "express"
import dotenv from "dotenv"
import { createServer } from "http"
import { SocketMain } from "./socket/socket-main";
import { Notification } from "./socket/rendalev/notification";
import { Hello } from "./socket/app-test/hello";

dotenv.config();

const app: Express = express()
const port : string | number = process.env.PORT || 9001;
const httpServer : any = createServer(app)
const io : SocketMain = SocketMain.getInstance(httpServer)

io.initializeHandlers([
    { path: 'notif', handler: new Notification()},
    { path: 'test', handler: new Hello()}
])

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World a');
})

httpServer.listen(port, () => {
    console.log(`Server are Running at Port: ${port}`)
})

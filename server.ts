import express, { urlencoded } from "express"
import dotenv from "dotenv"
import { createServer } from "http"
import { SocketMain } from "./services/socket/socket-main";
import { NotificationRendalev } from "./services/socket/rendalev/notification-rendalev";
import { Hello } from "./services/socket/app-test/hello";
import routerWeb from "./routes/web";
import {clientRedis} from "./services/redis/redis-main";
import { createAdapter } from "@socket.io/redis-adapter";
import { errorHandler } from "./helper/error-handlers";
import routerSirup from "./routes/sirup";



dotenv.config();
const app: express.Application = express()
const port : string | number = parseInt(process.env.APP_PORT!, 10) || 9001;
const httpServer : any = createServer(app)
const io : SocketMain = SocketMain.getInstance(httpServer)
const pubClient = clientRedis
const subClient = pubClient.duplicate()


app.set('env', process.env)
app.set('root_dirname', __dirname)
app.use('/static', express.static('public'))
app.use('/', routerWeb)
app.use('/sirup', routerSirup)
// app.use(errorHandler)

/** untuk connect ke redis */

// Promise.all(
//     [pubClient.connect(), subClient.connect()]
// ).then(() => {
//     io.adapter(createAdapter(pubClient, subClient))
// }).catch((e) => {
//     console.log(e);
//     console.log(`Error tidak bisa membuat adapter socket.io, Host : ${e.address} | Port : ${e.port} | Code : ${e.code}`)
//     console.log(`Force Close Service Server`);
//     httpServer.close();
// })

/** initsialisasi fungsi socket io */
io.initializeHandlers([
    /** path : ini di isi terserah menyesuaikan | handler : sesuai nama classnya */
    { path: 'notif-rendalev', handler: new NotificationRendalev()},
    { path: 'hello', handler: new Hello()}
])

httpServer.listen(port, () => {
    console.log(`Server up, you can access at 127.0.0.1:${port}`)
})

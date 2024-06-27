import Express, {Request, Response} from "express"
import path = require("path")

const pathView: string = "/resources/view"
const routerWeb = Express.Router();

routerWeb.get("/", (req : Request, res : Response) => {
    res.status(200).send({"messages" : "Hello World", "creator": "Dedisu"});
})

routerWeb.get("/unit-kerja", (req: Request, res : Response) => {
    // res.status(200).send(path.resolve(__dirname));
    res.status(200).sendFile(path.join(req.app.get('root_dirname'), `${pathView}/unit-kerja/index.html`))
})

routerWeb.get("/bidang", (req: Request, res : Response) => {
    res.status(200).sendFile(path.join(req.app.get('root_dirname'), `${pathView}/bidang/index.html`))
})

export default routerWeb;
import Express, {Request, Response} from "express"
import path = require("path")

const pathView: string = "/resources/view"
export const router = Express.Router();

router.get("/", (req : Request, res : Response) => {
    res.status(200).send({"messages" : "Hello World", "Creator": "Dedisu"});
})

router.get("/unit-kerja", (req: Request, res : Response) => {
    // res.status(200).send(path.resolve(__dirname));
    res.status(200).sendFile(path.join(req.app.get('root_dirname'), `${pathView}/unit-kerja/index.html`))
})

router.get("/bidang", (req: Request, res : Response) => {
    res.status(200).sendFile(path.join(req.app.get('root_dirname'), `${pathView}/bidang/index.html`))
})

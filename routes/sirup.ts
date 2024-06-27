import Express, {Request, Response} from "express"
import axios from "axios";

const routerSirup = Express.Router();


routerSirup.get("/", (req: Request, res: Response) => {
    res.send({"messages" : "Hello World a", "creator": "Dedisu"});
})

routerSirup.get("/test", async (req: Request, res: Response) => {
    // const env         = req.app.get('env')

    const response = await axios.get(`https://sirup.lkpp.go.id/sirup/datatablectr/dataruppenyediasatker`, {
        params: {
         'tahun': '2024', 
         'idSatker': '71953', 
         'sSearch_1': '[IW] - DATIN - Belanja Barang dan Jasa',
         'bRegex_1': false,
         'bSearchable_1': true,
         'bSortable_1': true
        }
    })
    console.log(response.data);
    
    res.send({"messages" : response.data, "headers": response.headers});
})


export default routerSirup;
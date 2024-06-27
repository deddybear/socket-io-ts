import { Error } from "../model/handlers";
import {Request, Response, NextFunction} from "express"

export function errorHandler(err: Error, req: Request, res: Response) {
    // console.log(err);
    
    // res.set("Content-Type", 'application/json')

    // res.status(err.code).send(err.msg)
}
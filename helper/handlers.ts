import { Error } from "../model/handlers";
import {Request, Response, NextFunction} from "express"

export function Handler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.header("Content-Type", 'application/json')

    res.status(err.code).send(err.msg)
}
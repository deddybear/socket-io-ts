import {Request, Response, NextFunction} from "express"

export interface Error {
    code : number,
    msg  : string
}
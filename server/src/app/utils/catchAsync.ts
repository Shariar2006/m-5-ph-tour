/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"

type CatchAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const catchAsync = (fn: CatchAsync) => (req: Request, res: Response, next: NextFunction) => {

    Promise.resolve(fn(req, res, next)).catch((err: any) => {
        console.log(err)
        next(err)
    })

}
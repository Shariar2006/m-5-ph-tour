/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import httpStatus from 'http-status-codes'
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.createUser(req.body)

        res.status(httpStatus.CREATED).json({
            message: 'user created successfully',
            user
        })

    } catch (error: any) {
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).json({
            message: `something went wrong ${error.message}`,
            error
        })
    }
}

export const UserControllers = { createUser }
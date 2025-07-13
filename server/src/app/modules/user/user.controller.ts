/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes'
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await UserService.createUser(req.body)

//         res.status(httpStatus.CREATED).json({
//             message: 'user created successfully',
//             user
//         })

//     } catch (err: any) {
//         console.log(err)
//         next(err)
//     }
// }

// const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await UserService.getAllUsers()

//         res.status(httpStatus.OK).json({
//             success: true,
//             message: "Get all users successfully",
//             data: users
//         })

//     } catch (err: any) {
//         console.log(err)
//         next(err)
//     }
// }





// using higher order function 

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        data: user,
        message: 'user created successfully'
    })
})

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    const token = req.headers.authorization

    const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload
    const payload = req.body

    const user = await UserService.updateUser(userId, payload, verifiedToken)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        data: user,
        message: 'user updated successfully'
    })
})

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user, meta } = await UserService.getAllUsers()

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        meta,
        message: 'Get all users successfully',
        data: user
    })
})

export const UserControllers = { createUser, getAllUser, updateUser }
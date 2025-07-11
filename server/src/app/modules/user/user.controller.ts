/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes'
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";


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

    res.status(httpStatus.CREATED).json({
        message: 'user created successfully',
        user
    })
})

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await UserService.getAllUsers()

        res.status(httpStatus.OK).json({
            success: true,
            message: "Get all users successfully",
            data: users
        })
})

export const UserControllers = { createUser, getAllUser }
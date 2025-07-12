/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import { AuthService } from "./auth.service"


const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

const loginInfo = await AuthService.credentialsLogin(req.body)
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        data: loginInfo,
        message: 'User logged in successfully'
    })
})

export const AuthController = {
    credentialsLogin
}
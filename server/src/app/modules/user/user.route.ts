/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { zodValidation } from "../../middlewares/zodValidation";

export const userRoute = Router()

userRoute.post('/register',
    zodValidation(createUserZodSchema)
    , UserControllers.createUser)
userRoute.get('/all-users',
    async (req: Request, res: Response, next: NextFunction) => {
const accessToken = j
    },
    UserControllers.getAllUser)
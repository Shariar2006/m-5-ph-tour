/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUpdateUserZodSchema, createUserZodSchema } from "./user.validation";
import { zodValidation } from "../../middlewares/zodValidation";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

export const userRoute = Router()

// register user
userRoute.post('/register',
    zodValidation(createUserZodSchema)
    , UserControllers.createUser)

// update user
userRoute.patch('/:id',
    zodValidation(createUpdateUserZodSchema),
    checkAuth(...Object.values(Role)) , UserControllers.updateUser)

// get all user
userRoute.get('/all-users', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUser)
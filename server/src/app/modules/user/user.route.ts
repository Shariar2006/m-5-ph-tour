import { Router } from "express";
import { UserControllers } from "./user.controller";


export const userRoute = Router()

userRoute.post('/register', UserControllers.createUser)

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";

export const authRoute = Router()

authRoute.post('/login', AuthController.credentialsLogin)
authRoute.post('/refresh-token', AuthController.getNewAccessToken)

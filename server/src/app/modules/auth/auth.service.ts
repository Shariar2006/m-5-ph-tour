import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const credentialsLogin = async (payload :Partial<IUser>)=>{
    const {email, password} = payload;

    const isUserExist = await User.findOne({email})

    if(!isUserExist){
        throw new AppError(StatusCodes.BAD_REQUEST, 'User dose not exist')
    }

    const isPasswordMatch = await bcrypt.compare(password as string, isUserExist.password as string)

    console.log(isPasswordMatch)

    if(!isPasswordMatch){
        throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid password')
    }

    const jwtPayload = {
        userId: isUserExist?._id,
        email: isUserExist?.email,
        role: isUserExist?.role
    }

const accessToken = jwt.sign(jwtPayload, 'secret', {
    expiresIn: '1d'
})

    return {
        accessToken
    }
}

export const AuthService = {
    credentialsLogin
}
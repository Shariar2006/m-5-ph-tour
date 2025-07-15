import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IUser, IsActive } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import { createUserTokens } from "../../utils/userTokens";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User dose not exist')
    }

    const isPasswordMatch = await bcrypt.compare(password as string, isUserExist.password as string)

    console.log(isPasswordMatch)

    if (!isPasswordMatch) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid password')
    }

    const userTokens = createUserTokens(isUserExist)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password:pass, ...rest} = isUserExist.toObject()

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest,
    }
}

const getNewAccessToken = async (refreshToken: string) => {
    
    const verifiedToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload

    const isUserExist = await User.findOne({ email: verifiedToken.email })

    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User dose not exist')
    }
    if (isUserExist.isDeleted) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User is deleted')
    }
    if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
        throw new AppError(StatusCodes.BAD_REQUEST, `User is ${isUserExist.isActive}`)
    }

    const userTokens = createUserTokens(isUserExist)

    return {
        accessToken: userTokens.accessToken,
    }
}


export const AuthService = {
    credentialsLogin,
    getNewAccessToken
}
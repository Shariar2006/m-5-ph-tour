import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface"
import { User } from "./user.model";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

const createUser = async (payload: Partial<IUser>) => {

    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User already exist')
    }

    const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_sALT))

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: authProvider,
        ...rest
    })

    return user
}

const updateUser = async (userId: string, payload: Partial<IUser>, verifiedToken: JwtPayload) => {
    const ifUserExist = await User.findById(userId)

    console.log(ifUserExist, userId)

    if (!ifUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
    }

    if (payload.role) {
        if (verifiedToken.role === Role.GUIDE || verifiedToken.role === Role.USER) {
            throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized')
        }

        if (payload.role === Role.SUPER_ADMIN && verifiedToken.role === Role.ADMIN) {
            throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized')
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (verifiedToken.role === Role.GUIDE || verifiedToken.role === Role.USER) {
            throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized')
        }
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password as string, Number(envVars.BCRYPT_sALT))
    }

    const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })
    return updatedUser

}

const getAllUsers = async () => {
    const user = await User.find()
    const total = await User.countDocuments()


    return {
        user,
        meta: { total }
    }
}

export const UserService = {
    createUser,
    getAllUsers,
    updateUser
}
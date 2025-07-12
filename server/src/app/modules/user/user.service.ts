import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface"
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {

    const { email, ...rest } = payload;

    const isUserExist = await User.findOne({email})

    if(isUserExist){
        throw new AppError(StatusCodes.BAD_REQUEST, 'User already exist')
    }

    const authProvider: IAuthProvider = {provider: "credentials", providerId: email as string}

    const user = await User.create({
        email,
        auths: authProvider,
        ...rest
    })

    return user
}

const getAllUsers = async()=>{
    const user = await User.find()
    const total = await User.countDocuments()


    return {
        user,
       meta: {total}
    }
}

export const UserService = {
    createUser,
    getAllUsers

}
import { IUser } from "./user.interface"
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {

    const { name, email } = payload;

    const user = await User.create({
        name,
        email
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
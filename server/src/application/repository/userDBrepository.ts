import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/userRepoMongoDB";
import { UserRegisterInterface } from "../../types/user";

export const userDbRepository= (repository:ReturnType<UserRepositoryMongoDB>)=>{


    const addUser = async (user: UserRegisterInterface)=>await repository.addUser(user)
    const getUserByEmail =async (email:string)=>await repository.getUserByEmail(email)

    return {
        addUser,
        getUserByEmail
    }

}

export type UserDbInterface = typeof userDbRepository
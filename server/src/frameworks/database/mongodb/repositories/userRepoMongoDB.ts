import User from "../models/userModel";
import { UserRegisterInterface } from "../../../../types/user";

export const userRepositoryMongoDB = ()=>{

const addUser = async (user:UserRegisterInterface)=> {
    return await User.create(user)
}
const getUserByEmail = async (email: string)=>{
    return User.findOne({email})
    
}
return {
    addUser,
    getUserByEmail

}

};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
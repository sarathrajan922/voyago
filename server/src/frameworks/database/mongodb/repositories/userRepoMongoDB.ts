import User from "../models/userModel";
import { TourConfirmationInterface, UserRegisterInterface } from "../../../../types/user";
import TourPackage from "../models/tourPackageModel";
import TourConfirm from "../models/tourConfirmDetails";

export const userRepositoryMongoDB = ()=>{

const addUser = async (user:UserRegisterInterface)=> {
    return await User.create(user)
}
const getUserByEmail = async (email: string)=>{
    return User.findOne({email}) 
}

const getAllTourPackage = async ()=>{
    return TourPackage.find({})
}

const bookPackage = async (bookingDetails: TourConfirmationInterface)=>{
    return await TourConfirm.create(bookingDetails)
}
return {
    addUser,
    getUserByEmail,
    getAllTourPackage,
    bookPackage

}

};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
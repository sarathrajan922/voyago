import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/userRepoMongoDB";
import { UserRegisterInterface ,TourConfirmationInterface} from "../../types/user";

export const userDbRepository= (repository:ReturnType<UserRepositoryMongoDB>)=>{


    const addUser = async (user: UserRegisterInterface)=>await repository.addUser(user)
    const getUserByEmail =async (email:string)=>await repository.getUserByEmail(email)
    const getAllPackage = async()=> await repository.getAllTourPackage()
    const packageBooking = async(bookingDetails: TourConfirmationInterface )=> await repository.bookPackage(bookingDetails)
    const getPackage = async(packageId: string)=> await repository.getPackage(packageId)
    return {
        addUser,
        getUserByEmail,
        getAllPackage,
        packageBooking,
        getPackage
    }

}

export type UserDbInterface = typeof userDbRepository
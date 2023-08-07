
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/userRepoMongoDB";
import { CommunityInterface, JoinCommunityInterface } from "../../types/community";
import { ConversationInterface } from "../../types/conversation";
import { UserRegisterInterface ,TourConfirmationInterface} from "../../types/user";

export const userDbRepository= (repository:ReturnType<UserRepositoryMongoDB>)=>{


    const addUser = async (user: UserRegisterInterface)=>await repository.addUser(user)
    const getUserByEmail =async (email:string)=>await repository.getUserByEmail(email)
    const checkUserBlock = async (email: string)=> await repository.checkUserBlock(email)
    const getAllPackage = async()=> await repository.getAllTourPackage()
    const packageBooking = async(bookingDetails: TourConfirmationInterface )=> await repository.bookPackage(bookingDetails)
    const getPackage = async(packageId: string)=> await repository.getPackage(packageId)
    const getUserDetails = async(userId: string)=> await repository.getUserDetails(userId)
    const updateUserProfile = async(userId: string, editedUser: UserRegisterInterface)=> await repository.userProfileUpdate(userId, editedUser)
    const userPasswordUpdate = async(userId:string, editedPassword:any)=> await repository.userPasswordUpdate(userId,editedPassword)
    const getUserBookedDetails = async(userId:string, packageId: string)=> await repository.getUserBookedDetails(userId,packageId)
    const getPrice = async(packageId: string)=> await repository.getPrice(packageId)
    const getAllBookings= async(userId: string)=> await repository.getAllBookings(userId)
    const paymentStatusChange = async(tourId: string) => repository.paymentStatusChange(tourId)
    const getAlertMsg = async(userId: string)=> repository.getAlertMsg(userId)
    const createCommunity = async(obj:CommunityInterface)=> repository.createCommunity(obj)
    const getAllCommunity = async()=> repository.getAllCommunity()
    const joinCommunity = async(obj:JoinCommunityInterface)=> repository.joinCommunity(obj)
    const getAllJoinedAndNotJoinedCommunity= async(userId:string)=> repository.getAllJoinedAndNotJoinedCommunity(userId)
    const createConversation = async(conversationObj:ConversationInterface)=> repository.createConversation(conversationObj)
    const getAllConversation = async(communityId: string)=> repository.getAllConversation(communityId);
    const getAllUniqueCategory = async()=>repository.getAllUniqueCategory();
    const userPasswordUpdatewithEmail = async(email:string,editedPassword:any)=> await repository.userPasswordUpdatewithEmail(email,editedPassword)
    return {
        addUser,
        getUserByEmail,
        getAllPackage,
        packageBooking,
        getPackage,
        checkUserBlock,
        getUserDetails,
        updateUserProfile,
        userPasswordUpdate,
        getUserBookedDetails,
        getPrice,
        getAllBookings,
        paymentStatusChange,
        getAlertMsg,
        createCommunity,
        getAllCommunity,
        joinCommunity,
        getAllJoinedAndNotJoinedCommunity,
        createConversation,
        getAllConversation,
        getAllUniqueCategory,
        userPasswordUpdatewithEmail
    }

}

export type UserDbInterface = typeof userDbRepository
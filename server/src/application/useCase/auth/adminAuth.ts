import { HttpStatus } from "../../../types/httpStatus";
import { AdminInterface } from "../../../types/admin";
import AppError from "../../../utils/appError";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { AdminDbInterface, adminDbRepository } from "../../repository/adminDBrepository";
import { ObjectId, Types } from "mongoose";

export const adminLoginUseCase = async (
    email: string,
    password: string,
    adminRepository: ReturnType<AdminDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {

    const admin: AdminInterface | null = await adminRepository.getAdminByEmail(email)
    if(!admin){
        throw new AppError("There is no admin in this email", HttpStatus.UNAUTHORIZED)
    }
    const isPasswordCorrect = await authService.comparePassword(password,admin?.password ?? '')
    if(!isPasswordCorrect){
        throw new AppError('sorry , your password was incorrect.Please double-check your password', HttpStatus.UNAUTHORIZED)
    }

    const token = authService.generateToken(admin?._id?.toString() ?? '')
    return token
}

export const adminGetAllUsersUseCase = async (
    adminRepository: ReturnType<AdminDbInterface> 
)=>{
    const userData = await adminRepository.getAllUsers()
    if(!userData){
        throw new AppError("No users found", HttpStatus.NOT_FOUND)
    }
    return userData
}

export const adminGetAllAgentsUseCase = async (
    adminDbRepository: ReturnType<AdminDbInterface>
)=>{
    const agentData = await adminDbRepository.getAllAgents()
    if(!agentData){
        throw new AppError("No agents found", HttpStatus.NOT_FOUND)
    }
    return agentData
}


export const adminBlockUserUseCase = async(
    adminDbRepository: ReturnType<AdminDbInterface>,
    ojbId: string
)=>{
    const adminBlockUser = await adminDbRepository.blockUser(ojbId)
    if(!adminBlockUser){
        throw new AppError('Operation failed', HttpStatus.NOT_MODIFIED)
    }
    return adminBlockUser
}

export const adminBlockAgentUseCase = async (
    adminDbRepository: ReturnType<AdminDbInterface>,
    ojbId: string
)=> {
 const adminBlockAgent = await adminDbRepository.blockAgent(ojbId)
    if(!adminBlockAgent){
        throw new AppError('Operation failed', HttpStatus.NOT_MODIFIED)
    }
    return adminBlockAgent
}
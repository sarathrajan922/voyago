import { HttpStatus } from "../../../types/httpStatus";
import { AdminInterface } from "../../../types/admin";
import AppError from "../../../utils/appError";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import {
  AdminDbInterface,
  adminDbRepository,
} from "../../repository/adminDBrepository";
import { ObjectId, Types } from "mongoose";

export const adminLoginUseCase = async (
  email: string,
  password: string,
  adminRepository: ReturnType<AdminDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const admin: AdminInterface | null = await adminRepository.getAdminByEmail(
    email
  );
  if (!admin) {
    throw new AppError("There is no admin in this email", HttpStatus.NOT_FOUND);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    admin?.password ?? ""
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      "sorry , your password was incorrect.Please double-check your password",
      HttpStatus.UNAUTHORIZED
    );
  }

  let id = ''
  if(admin){
    id = admin?._id?.toString() ?? ''
  }

  const payload = {
    id: id,
    role: 'admin'
  }

  const token = authService.generateToken(payload);
  return token;
};

export const adminGetAllUsersUseCase = async (
  adminRepository: ReturnType<AdminDbInterface>
) => {
  const userData = await adminRepository.getAllUsers();
  if (!userData) {
    throw new AppError("No users found", HttpStatus.NOT_FOUND);
  }
  return userData;
};

export const adminGetAllAgentsUseCase = async (
  adminDbRepository: ReturnType<AdminDbInterface>
) => {
  const agentData = await adminDbRepository.getAllAgents();
  if (!agentData) {
    throw new AppError("No agents found", HttpStatus.NOT_FOUND);
  }
  return agentData;
};

export const adminBlockUserUseCase = async (
  adminDbRepository: ReturnType<AdminDbInterface>,
  ojbId: string
) => {
  const adminBlockUser = await adminDbRepository.blockUser(ojbId);
  if (!adminBlockUser) {
    throw new AppError("Operation failed", HttpStatus.NOT_MODIFIED);
  }
  return adminBlockUser;
};

export const adminBlockAgentUseCase = async (
  adminDbRepository: ReturnType<AdminDbInterface>,
  ojbId: string
) => {
  const adminBlockAgent = await adminDbRepository.blockAgent(ojbId);
  if (!adminBlockAgent) {
    throw new AppError("Operation failed", HttpStatus.NOT_MODIFIED);
  }
  return adminBlockAgent;
};

export const adminGetUnverifiedAgentsUseCase = async (
  adminDbRepository: ReturnType<AdminDbInterface>
) => {
  const getAllUnverifiedAgents = await adminDbRepository.getUnverifiedAgents();
  if (!getAllUnverifiedAgents) {
    throw new AppError("Operation failed", HttpStatus.NOT_FOUND);
  }

  return getAllUnverifiedAgents;
};

export const adminVerifyAgentUseCase = async (
  adminDbRepository: ReturnType<AdminDbInterface>,
  objId: string
) => {
  const adminVerifyAgent = await adminDbRepository.verifyAgent(objId);
  if (!adminVerifyAgent) {
    throw new AppError("Operation failed", HttpStatus.NOT_MODIFIED);
  }
  return adminVerifyAgent;
};

export const BasicDetailsUserAgentPackageBookingUseCase = async(
  adminDbRepository: ReturnType<AdminDbInterface>
)=>{
  const result = await adminDbRepository.BasicDetailsUserAgentPackageBooking();
  if(!result){
    throw new AppError('could not fetch basic details of user agent package ', HttpStatus.NOT_FOUND)
  }
  return result
}

export const getAgentsStatusUseCase = async(
  adminDbRepository:ReturnType<AdminDbInterface>
)=>{
  const result = await adminDbRepository.getAgentStatus();
  if(!result){
    throw new AppError('could not fetch agents status',HttpStatus.NOT_FOUND)
  }
  return result
}

export const getAllBookingStatUseCase = async(
  adminDbRepository:ReturnType<AdminDbInterface> 
)=>{
  const result = await adminDbRepository.getAllBookingStat();
  if(!result){
    throw new AppError('could not get all booking status',HttpStatus.NOT_FOUND)
  }
  return result
}

export const getAdminRevenueUseCase = async(
  adminDbRepository: ReturnType<AdminDbInterface> 
)=>{
  const result = await adminDbRepository.getRevenue();
  if(!result){
    throw new AppError('could not find revene',HttpStatus.NOT_FOUND)
  }
  return result
}

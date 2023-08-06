import { HttpStatus } from "../../../types/httpStatus";
import { AgentAddCategoryInterface, AgentRegisterInterface, AgentTourPackageInterface } from "../../../types/agent";
import AppError from "../../../utils/appError";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { AgentDbInterface, agentDbRepository } from "../../repository/agentDBrepository";
import { AgentInterface } from "../../../types/agent";
import Category from "../../../frameworks/database/mongodb/models/categoryModel";

export const agentRegisterUseCase = async (
    agent : AgentRegisterInterface,
    agentRepository: ReturnType<AgentDbInterface>,
    authService : ReturnType<AuthServiceInterface>
) => {
    agent.email = agent.email;
    console.log(agent)
    const isExistingEmail = await agentRepository.getAgentByEmail(agent.email);
    if(isExistingEmail){
        throw new AppError("existing email", HttpStatus.CONFLICT);
    }

    if(agent.password){
        agent.password = await authService.hashPassword(agent.password);  
    }

    const agentData= await agentRepository.addAgent(agent)
    const payload ={
      id: agentData?._id.toString(),
      role: 'agent'
    }
    const token = authService.generateToken(payload)
    return {
      token,
      agentData
    }
}

export const agentLoginUseCase = async (
    email: string,
    password: string,
    agentRepository: ReturnType<AgentDbInterface>,
    authService: ReturnType<AuthServiceInterface>
    ) => {
        const agentData: AgentInterface | null = await agentRepository.getAgentByEmail(email)
        if(!agentData){
            throw new AppError("this user doesn't exist", HttpStatus.NOT_FOUND)
        }
        const isPasswordCorrect = await authService.comparePassword(password,agentData?.password ?? '')
        if(!isPasswordCorrect){
            throw new AppError('sorry, your password was incorrect.Please double-check your password', HttpStatus.UNAUTHORIZED)
        }
        const isAgentActive = await agentRepository.checkAgentBlock(email)
        if(!isAgentActive){
         throw new AppError('Agent blocked by Admin',HttpStatus.NOT_ACCEPTABLE)
        }

        let id = ''
        if(agentData){
         id = agentData?._id?.toString() ?? ''
        }
        const payload ={
         id: id,
         role: 'agent'
       }
        const token = authService.generateToken(payload)
        return {
         token,
         agentData
        }
    }

export const agentAddCategoryUseCase = async (
    category: AgentAddCategoryInterface,
    agentRepository: ReturnType<AgentDbInterface> ,

)=>{

//! check category is already exist
const agentId = category.agentId;
const categroyName = category.name;

const isCategoryExist = await agentRepository.checkCategoryExist(agentId ?? '',categroyName ?? '')
if(isCategoryExist){
    throw new AppError('Category Already Exists',HttpStatus.CONFLICT)
}

const result = await agentRepository.addCategory(category)
return result
 }

 export const getAgentCategoryUseCase = async(
    objId: string,
    agentRepository:ReturnType<AgentDbInterface>
 )=>{
    const result = await agentRepository.getCategory(objId)
    return result
 }

 export const deleteCategoryUseCase = async(
    agentId: string,
    categoryName: string,
    agentRepository: ReturnType<AgentDbInterface>
 )=>{
    const result = await agentRepository.deleteCategory(agentId,categoryName)
    return result
 }

 export const addTourPackageUseCase= async(
    tourPackage:AgentTourPackageInterface,
    agentRepository: ReturnType<AgentDbInterface>
 )=>{
    //! check the package name is already exists
    const result = await agentRepository.addPackage(tourPackage)
    return result
 }

 export const getAllPackageUseCase = async(
    agentId: string,
    agentRepository: ReturnType<AgentDbInterface>
 )=>{
    const result = await agentRepository.getAllPackage(agentId)
    return result
 }

 export const getPackageUseCase = async(
    packageId: string,
    agentRepository : ReturnType<AgentDbInterface>
 )=>{
    const result = await agentRepository.getPackage(packageId)
    if(!result){
        throw new AppError('package not found',HttpStatus.NOT_FOUND)
    }
    return result
 }

 export const disablepackageUseCase = async(
    packageId: string,
    agentRepository: ReturnType<AgentDbInterface>

 )=>{
    const result = await agentRepository.disablePackage(packageId);
    if(!result){
        throw new AppError('could  not disable package',HttpStatus.NOT_FOUND)
    }
    return result
 }

 export const updatePackageUseCase = async(
    editedPackage: AgentTourPackageInterface,
    packageId: string,
    agentRepository: ReturnType<AgentDbInterface>
 )=> {
    const result = await agentRepository.updatePackage(editedPackage,packageId)
    if(!result){
        throw new AppError('could not update package',HttpStatus.NOT_FOUND)
    }
    return result
 }

 export const deletePackageUseCase = async(
   packageId: string,
   agentRepository: ReturnType<AgentDbInterface>
 )=>{
   const result = await agentRepository.deletePackage(packageId)
   return result
 }

 export const AgentGetAllBookingsUseCase = async(
   agentId: string,
   agentRepository: ReturnType<AgentDbInterface>
 )=>{
   const result = await agentRepository.getAllBookings(agentId)
   return result 
 }

 export const checkAgentVerificationUseCase = async(
   agentId: string,
   agentRepository: ReturnType<AgentDbInterface>
 ) => {
   const result = await agentRepository.checkAgentVerified(agentId)
   return result
 }

 export const getAgentProfileUseCase = async(
   agentId: string,
   agentRepository: ReturnType<AgentDbInterface>
 )=> {
   const result = await agentRepository.getAgentProfile(agentId)
   if(!result){
     throw new AppError('could not find agent profile',HttpStatus.NOT_FOUND)
   }
   return result
 }

 export const agentProfileUpdateUseCase = async(
   agentId: string,
   editedData: AgentRegisterInterface,
   agentRepository: ReturnType<AgentDbInterface>,
   authService: ReturnType<AuthServiceInterface>
 )=>{
   if (editedData.password) {
      editedData.password = await authService.hashPassword(editedData.password);
    }
   const result = await agentRepository.agentProfileUpdate(agentId,editedData)
   if(!result){
      throw new AppError('could not update agent profile',HttpStatus.NOT_MODIFIED)
   }
   return result
 }

 export const paymentAlertUseCase = async(
   obj:any,
   agentRepository: ReturnType<AgentDbInterface>
 )=>{
   const result = await agentRepository.paymentAlert(obj)
   if(!result){
      throw new AppError('could not add alert message into DB',HttpStatus.NOT_MODIFIED)
   }
   return result
 }

 export const getAgentBookingStatUseCase = async(
   agentId:string,
   agentRepository: ReturnType<AgentDbInterface>
 )=>{
   const result = await agentRepository.getAgentBookingStat(agentId)
   if(!result){
      throw new AppError('could not find booking status',HttpStatus.NOT_FOUND)
   }
   return result
 }

 export const getAgentRevenueUseCase = async(
  agentId:string,
  agentDbRepository: ReturnType<AgentDbInterface> 
)=>{
  const result = await agentDbRepository.getRevenue(agentId);
  if(!result){
    throw new AppError('could not find revene',HttpStatus.NOT_FOUND)
  }
  return result
}

export const getUserCountAndBookingCountUseCase = async(
  agentId:string,
  agentDbRepository:  ReturnType<AgentDbInterface> 
)=>{
  const result = await agentDbRepository.getUserCountAndBookingCount(agentId);
  if(!result){
    throw new AppError('could not get user count and booking count',HttpStatus.NOT_FOUND)
  }
  return result;
}
import { HttpStatus } from "../../../types/httpStatus";
import { AgentAddCategoryInterface, AgentRegisterInterface } from "../../../types/agent";
import AppError from "../../../utils/appError";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { AgentDbInterface } from "../../repository/agentDBrepository";
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
        throw new AppError("existing email", HttpStatus.UNAUTHORIZED);
    }

    if(agent.password){
        agent.password = await authService.hashPassword(agent.password);  
    }

    const {_id: agentId }= await agentRepository.addAgent(agent)
    const token = authService.generateToken(agentId.toString())
    return token
}

export const agentLoginUseCase = async (
    email: string,
    password: string,
    agentRepository: ReturnType<AgentDbInterface>,
    authService: ReturnType<AuthServiceInterface>
    ) => {
        const agent: AgentInterface | null = await agentRepository.getAgentByEmail(email)
        if(!agent){
            throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED)
        }
        const isPasswordCorrect = await authService.comparePassword(password,agent?.password ?? '')
        if(!isPasswordCorrect){
            throw new AppError('sorry, your password was incorrect.Please double-check your password', HttpStatus.UNAUTHORIZED)
        }
        const token = authService.generateToken(agent?._id?.toString() ?? '')
        return token
    }

export const agentAddCategoryUseCase = async (
    category: AgentAddCategoryInterface,
    agentRepository: ReturnType<AgentDbInterface> ,

)=>{

//! check category is already exist
//     category.name = category.name
//     console.log(category)
//     const isNameExist = await agentRepository.

const result = await agentRepository.addCategory(category)
return result
 }
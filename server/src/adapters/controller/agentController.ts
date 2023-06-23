import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { AgentDbInterface } from "../../application/repository/agentDBrepository";
import { AgentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/agentRepoMongoDB";
import asyncHandler from "express-async-handler";
import { Request,Response } from "express";
import { agentAddCategoryUseCase, agentLoginUseCase, agentRegisterUseCase } from "../../application/useCase/auth/agentAuth";
import { AgentRegisterInterface, AgentInterface, AgentAddCategoryInterface } from "../../types/agent";


const agentController = (
    authServiceInterface: AuthServiceInterface,
    authService: AuthService,
    agentDbRepositoryInterface: AgentDbInterface,
    agentDbRepositoryMongoDb: AgentRepositoryMongoDB
)=>{
    const dbRepositoryAgent = agentDbRepositoryInterface(agentDbRepositoryMongoDb())
    const authServices = authServiceInterface(authService())

    const agentRegister = asyncHandler(async (req:Request,res: Response)=>{
       
        const agent: AgentRegisterInterface = req.body
        if(req.file){
            agent.idProof_img = req.file.path
        }
        const token = await agentRegisterUseCase(agent,dbRepositoryAgent,authServices)
        res.json({
            status: true,
            message: 'agent successfully registered',
            token
        })
    })

    const agentLogin = asyncHandler(async (req: Request,res: Response)=>{
      
        console.log(req.body)
        const {email,password}: {email: string, password: string}= req.body;
        const agent : AgentInterface = req.body
        const token = await agentLoginUseCase(email,password,dbRepositoryAgent,authServices)
        res.json({
            status: true,
            message: 'agent login successful',
            token
        })
    })

    const addCategory = asyncHandler(async (req: Request, res: Response)=>{
        console.log(req.body)
        const category : AgentAddCategoryInterface = req.body
        const result = await agentAddCategoryUseCase(category,dbRepositoryAgent)
        
        res.json({
            status: true,
            message: 'category added successfully',
            result
        })
    })

    return {
        agentRegister,
        agentLogin,
        addCategory
    }
}

export default agentController
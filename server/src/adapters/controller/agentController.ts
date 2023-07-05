import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { AgentDbInterface } from "../../application/repository/agentDBrepository";
import { AgentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/agentRepoMongoDB";
import asyncHandler from "express-async-handler";
import { Request,Response } from "express";
import { addTourPackageUseCase, agentAddCategoryUseCase, agentLoginUseCase, agentRegisterUseCase, deleteCategoryUseCase, getAgentCategoryUseCase, getAllPackageUseCase, getPackageUseCase } from "../../application/useCase/auth/agentAuth";
import { AgentRegisterInterface, AgentInterface, AgentAddCategoryInterface } from "../../types/agent";
import { CustomRequest } from "../../types/expressRequest";


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
       
        const category : AgentAddCategoryInterface = req.body
        const result = await agentAddCategoryUseCase(category,dbRepositoryAgent)
        
        res.json({
            status: true,
            message: 'category added successfully',
            result
        })
    })

    const getCategory = asyncHandler(async (req: Request,res: Response)=>{
        const objId = req.params.id
        const result = await getAgentCategoryUseCase(objId,dbRepositoryAgent)
        res.json({
            status: true,
            message: 'All categories of the requested agent',
            result
        })
    })

    const deleteCategory = asyncHandler(async (req: Request, res: Response)=>{
        const data = req?.body
        const agentId = data?.agentId
        const categoryName = data?.categoryName
        
        const result = await deleteCategoryUseCase(agentId,categoryName,dbRepositoryAgent)
        res.json({
            status: true,
            message: 'Category deleted successfully',
            result
        })
    })

    const addPackage = asyncHandler(async (req: Request, res: Response) =>{
        const data = req?.body 
        if(req.file){
            data.images = req.file.path
        }
        
        data.duraction = parseInt(req?.body?.duraction)
        data.price = parseInt(req?.body?.price)
        const result = await  addTourPackageUseCase(data, dbRepositoryAgent)
        res.json({
            status: true,
            message: 'tour package added successfully',
            result
        })
    })

    const getAllPackages = asyncHandler(async(req: CustomRequest, res: Response) => {
        const agentId = req.params.id;
        // const agentId = req?.payload ?? ''
        const result = await getAllPackageUseCase(agentId,dbRepositoryAgent)
        res.json({
            status: true,
            message: ' All packages successfully fetched',
            result
        })
    })

    const getPackage = asyncHandler(async(req: CustomRequest, res: Response) =>{
       
        const packageId = req?.params?.id
        const result = await getPackageUseCase(packageId,dbRepositoryAgent) 
        res.json({
            status: true,
            message: 'Package fetch successful',
            result

        })
    })

    return {
        agentRegister,
        agentLogin,
        addCategory,
        getCategory,
        deleteCategory,
        addPackage,
        getAllPackages,
        getPackage
    }
}

export default agentController
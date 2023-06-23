import { AuthServiceInterface, authServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { AdminDbInterface } from "../../application/repository/adminDBrepository";
import { AdminRepossitoryMongoDB } from "../../frameworks/database/mongodb/repositories/adminRepoMongoDB";
import { adminBlockAgentUseCase, adminBlockUserUseCase, adminGetAllAgentsUseCase, adminLoginUseCase  } from "../../application/useCase/auth/adminAuth";
import { AdminInterface } from "../../types/admin";
import { Request,Response} from 'express'
import { adminGetAllUsersUseCase } from "../../application/useCase/auth/adminAuth";
import asyncHandler from "express-async-handler";


const adminController = (
    authServiceInterface: AuthServiceInterface,
    authService: AuthService,
    adminDbRepositoryInterface: AdminDbInterface,
    adminDbRepositoryMongoDb: AdminRepossitoryMongoDB
) => {
    const dbRepositoryAdmin = adminDbRepositoryInterface(adminDbRepositoryMongoDb())
    const authServices = authServiceInterface(authService())

    const adminLogin = asyncHandler(async (req: Request, res: Response)=>{
        console.log(req.body)
        const {email,password}:{email: string, password: string} = req.body;
        const admin: AdminInterface = req.body
        const token = await adminLoginUseCase(email,password,dbRepositoryAdmin,authServices)
        res.json({
            status: true,
            message:'admin login successful',
            token
        })
    })

    const adminGetAllUsers = asyncHandler(async (req: Request,res: Response)=>{
        const userData = await adminGetAllUsersUseCase(dbRepositoryAdmin)
        res.json({
            status: 'success',
            userData
        })
    })


    const adminGetAllAgents = asyncHandler(async (req: Request,res:Response)=>{
        const agentData = await adminGetAllAgentsUseCase(dbRepositoryAdmin)
        res.json({
            status: 'success',
            agentData
        })
    })

    const adminBlockUser = asyncHandler(async(req: Request,res: Response)=>{
        const userId = req.params.id
        
        const result = await adminBlockUserUseCase(dbRepositoryAdmin, userId)

        res.json({
            status: 'success',
            result
        })
    })

    const adminBlockAgent = asyncHandler(async (req: Request, res: Response)=>{
        const agentId = req.params.id
        const result = await adminBlockAgentUseCase(dbRepositoryAdmin,agentId)

        res.json({
            status: 'success',
            result
        })
    })
     
    

    return {
        adminLogin,
        adminGetAllUsers,
        adminGetAllAgents,
        adminBlockUser,
        adminBlockAgent
    }
}

export default adminController
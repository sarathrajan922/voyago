import { AuthServiceInterface, authServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { AdminDbInterface } from "../../application/repository/adminDBrepository";
import { AdminRepossitoryMongoDB } from "../../frameworks/database/mongodb/repositories/adminRepoMongoDB";
import { BasicDetailsUserAgentPackageBookingUseCase, adminBlockAgentUseCase, adminBlockUserUseCase, adminGetAllAgentsUseCase, adminGetUnverifiedAgentsUseCase, adminLoginUseCase, adminVerifyAgentUseCase, getAdminRevenueUseCase, getAgentsStatusUseCase, getAllBookingStatUseCase  } from "../../application/useCase/auth/adminAuth";
import { AdminInterface } from "../../types/admin";
import { Request,Response} from 'express'
import { adminGetAllUsersUseCase } from "../../application/useCase/auth/adminAuth";
import asyncHandler from "express-async-handler";
import { CustomRequest } from "../../types/expressRequest";


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

    const getUnverifiedAgents = asyncHandler(async (req:Request,res: Response)=>{
        const result = await adminGetUnverifiedAgentsUseCase(dbRepositoryAdmin)
        res.json({
            status: 'success',
            result
        })
    })

    const verifyAgent = asyncHandler(async (req:Request,res:Response)=>{
        const agentId = req.params.id
        const result = await adminVerifyAgentUseCase(dbRepositoryAdmin, agentId)
        res.json({
            status: 'success',
            result
        })
    })

    const BasicDetailsUserAgentPackageBooking = asyncHandler(async(req:CustomRequest,res:Response)=>{
        const result = await BasicDetailsUserAgentPackageBookingUseCase(dbRepositoryAdmin)
        res.json({
            status: 'success',
            result
        })
    })

    const getAgentsStatus = asyncHandler(async(req:Request,res:Response)=>{
        const result = await getAgentsStatusUseCase(dbRepositoryAdmin)
        res.json({
            status:true,
            message:'fetch agents status successfully',
            result
        })
    })

    const getAllBookingStat = asyncHandler(async(req:Request,res:Response)=>{
        const result = await getAllBookingStatUseCase(dbRepositoryAdmin)
        res.json({
            status:true,
            message:'fetch all booking statuses successfully',
            result
        })
    })

    const getRevenue = asyncHandler(async(req:Request,res:Response)=>{
        const result = await getAdminRevenueUseCase(dbRepositoryAdmin)
        res.json({
            status:true,
            message: 'fetch admin revenue successfull',
            result
        })
    })

     
    

    return {
        adminLogin,
        adminGetAllUsers,
        adminGetAllAgents,
        adminBlockUser,
        adminBlockAgent,
        getUnverifiedAgents,
        verifyAgent,
        BasicDetailsUserAgentPackageBooking,
        getAgentsStatus,
        getAllBookingStat,
        getRevenue
    }
}

export default adminController
import { AuthServiceInterface, authServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { AdminDbInterface } from "../../application/repository/adminDBrepository";
import { AdminRepossitoryMongoDB } from "../../frameworks/database/mongodb/repositories/adminRepoMongoDB";
import { adminLoginUseCase } from "../../application/useCase/auth/adminAuth";
import { AdminInterface } from "../../types/admin";
import { Request,Response} from 'express'
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

    return {
        adminLogin
    }
}

export default adminController
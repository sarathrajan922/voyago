import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { UserDbInterface } from "../../application/repository/userDBrepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/userRepoMongoDB";
import asyncHandler from 'express-async-handler'
import  {Request, Response} from 'express'
import { userLoginUserCase, userRegisterUseCase } from "../../application/useCase/auth/userAuth";
import { UserRegisterInterface, UserInterface } from "../../types/user";

const authController = (
    authServiceInterface : AuthServiceInterface,
    authService: AuthService,
    userDbRepositoryInterface: UserDbInterface,
    userDbRepositoryMongoDb: UserRepositoryMongoDB
)=>{
    const dbRepositoryUser = userDbRepositoryInterface(userDbRepositoryMongoDb())
    const authServices = authServiceInterface(authService())
    
    const userRegister = asyncHandler(async (req:Request,res:Response)=>{
        const user:UserRegisterInterface= req.body
        const token = await userRegisterUseCase(user,dbRepositoryUser,authServices)
        res.json({
            status: true,
            message: "user registered successfully",
            token
        })
    })

    const userLogin = asyncHandler(async (req: Request,res:Response)=>{
        const {email,password}:{email:string,password:string} = req.body;

        const user: UserInterface = req.body
        const token = await userLoginUserCase(email,password,dbRepositoryUser,authServices)
        res.json({
            status: true,
            message: 'user login successful',
            token
        })
    })

    return {
        userRegister,
        userLogin
    }

}

export default authController
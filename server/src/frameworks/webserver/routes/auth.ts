import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { userDbRepository } from "../../../application/repository/userDBrepository";
import { userRepositoryMongoDB } from "../../database/mongodb/repositories/userRepoMongoDB";
import authController from "../../../adapters/controller/authController";
import express from 'express'

const authRouter = ()=>{
    const router = express.Router()

    const controller = authController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongoDB
    )

    router.post('/user/signup',controller.userRegister)
    router.post('/user/login',controller.userLogin)
    router.get('/get-tour-packages', controller.getAllPackage)
    router.post('/book-package',controller.bookPackage)
    return router
}

export default authRouter
import express from "express";
import { authService } from "../../services/authService";
import { AuthServiceInterface, authServiceInterface } from "../../../application/services/authServiceInterface";
import { adminDbRepository } from "../../../application/repository/adminDBrepository";
import { adminRepossitoryMongoDB } from "../../database/mongodb/repositories/adminRepoMongoDB";
import adminController from "../../../adapters/controller/adminController";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";


const adminRouter = ()=>{
    const router = express.Router()

    const controller = adminController(
        authServiceInterface,
        authService,
        adminDbRepository,
        adminRepossitoryMongoDB
    )

    router.post('/login', controller.adminLogin)
    router.get('/get-all-users', controller.adminGetAllUsers)
    router.get('/get-all-agents', controller.adminGetAllAgents)
    router.post('/block-user/:id', controller.adminBlockUser)
    router.post('/block-agent/:id',  controller.adminBlockAgent)
    router.get('/get-all-unverified-agents',controller.getUnverifiedAgents)
    router.post('/agent-verification/:id',controller.verifyAgent)
    return router

}

export default adminRouter
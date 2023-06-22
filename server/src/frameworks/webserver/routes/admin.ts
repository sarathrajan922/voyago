import express from "express";
import { authService } from "../../services/authService";
import { AuthServiceInterface, authServiceInterface } from "../../../application/services/authServiceInterface";
import { adminDbRepository } from "../../../application/repository/adminDBrepository";
import { adminRepossitoryMongoDB } from "../../database/mongodb/repositories/adminRepoMongoDB";
import adminController from "../../../adapters/controller/adminController";


const adminRouter = ()=>{
    const router = express.Router()

    const controller = adminController(
        authServiceInterface,
        authService,
        adminDbRepository,
        adminRepossitoryMongoDB
    )

    router.post('/login', controller.adminLogin)
    return router

}

export default adminRouter
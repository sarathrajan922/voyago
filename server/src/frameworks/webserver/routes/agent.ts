import { AuthService, authService } from "../../services/authService"
import { authServiceInterface } from "../../../application/services/authServiceInterface"
import { agentDbRepository } from "../../../application/repository/agentDBrepository"
import { agentRepositoryMongoDB } from "../../database/mongodb/repositories/agentRepoMongoDB"
import agentController from "../../../adapters/controller/agentController"
import express from 'express'
import { upload } from "../middlewares/cloudinary"
import authenticationMiddleware from "../middlewares/authenticationMiddleware"

const agentRouter = ()=>{
 const router = express.Router()
  
 const controller = agentController(
    authServiceInterface,
    authService,
    agentDbRepository,
    agentRepositoryMongoDB
 )

 router.post('/signup',upload, controller.agentRegister)
 router.post('/login', controller.agentLogin)
 router.post('/category-add', controller.addCategory)
 return router
}

export default agentRouter
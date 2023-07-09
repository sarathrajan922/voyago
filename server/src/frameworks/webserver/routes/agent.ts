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
 router.get('/get-all-category/:id',authenticationMiddleware, controller.getCategory)
 router.patch('/delete-category', controller.deleteCategory)
 router.post('/add-tour-package',upload,controller.addPackage)
 router.get('/get-all-package/:id', controller.getAllPackages)
 router.get('/get-package/:id', controller.getPackage)
 router.patch('/disable-package/:id',controller.disablePackage)
 router.put('/update-package/:id',upload,controller.updatePackage)
 router.put('/delete-package/:id',controller.deletePackage)


 return router
}

export default agentRouter
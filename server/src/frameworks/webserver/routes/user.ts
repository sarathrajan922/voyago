import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { userDbRepository } from "../../../application/repository/userDBrepository";
import { userRepositoryMongoDB } from "../../database/mongodb/repositories/userRepoMongoDB";
import authController from "../../../adapters/controller/authController";
import express from 'express'
import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import { userRoleCheckMiddleware } from "../middlewares/roleCheck";
import { signInWithGoogle } from "../../../application/useCase/auth/userAuth";
import { googleAuthServiceInterface } from "../../../application/services/googleServiceInterface";
import { googleAuthService } from "../../services/googleAuthService";
import configKeys from "../../../config";


const authRouter = ()=>{
    const router = express.Router()

    const controller = authController(
        authServiceInterface,
        authService,
        googleAuthServiceInterface,
        googleAuthService,
        userDbRepository,
        userRepositoryMongoDB,

    )

    router.post('/user/signup',controller.userRegister)
    router.post('/user/login',controller.userLogin)
    router.get('/package-details/:id',controller.getPackage)
    router.get('/get-tour-packages',controller.getAllPackage)
    router.post('/book-package',authenticationMiddleware,userRoleCheckMiddleware,controller.bookPackage)
    router.post("/login-with-google",controller.loginWithGoogle)
    router.get('/user-profile',authenticationMiddleware,userRoleCheckMiddleware,controller.getUserDetails)
    router.put('/user-profile-update',authenticationMiddleware,userRoleCheckMiddleware,controller.userUpdateProfile)
    router.get('/user-get-package-booked-data/:id', authenticationMiddleware,userRoleCheckMiddleware,controller.getUserBookedDetails)
    router.get('/user-get-all-bookings', authenticationMiddleware,userRoleCheckMiddleware,controller.getAllBookings)
    router.post('/user-Pay-status-change',authenticationMiddleware,userRoleCheckMiddleware,controller.paymentStatusChange)
    router.get('/user-get-alert-messages',authenticationMiddleware,userRoleCheckMiddleware,controller.getAlertMsg)
    router.post('/user-create-community',authenticationMiddleware,userRoleCheckMiddleware,controller.createCommnuity)
    router.get('/get-all-community',authenticationMiddleware,userRoleCheckMiddleware,controller.getAllCommunity)
    router.post('/join-community',authenticationMiddleware,userRoleCheckMiddleware,controller.joinCommunity)
    router.get('/getAlluserJoinedAndNotJoinedcommunity',authenticationMiddleware,userRoleCheckMiddleware,controller.getAllJoinedAndNotJoinedCommunity)
    router.post('/create-conversation',authenticationMiddleware,userRoleCheckMiddleware,controller.createConversation)
    router.get('/get-all-coversation/:id',authenticationMiddleware,userRoleCheckMiddleware,controller.getAllConversation)
    router.get('/get-all-unique-category',authenticationMiddleware,userRoleCheckMiddleware,controller.getAllUniqueCategory)
    return router
}

export default authRouter
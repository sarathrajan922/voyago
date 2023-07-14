import express from 'express';
import { paymentServiceInterface } from '../../../application/services/paymentServiceInterface';
import { paymentService } from '../../services/paymentService';
import paymentController from '../../../adapters/controller/paymentController';
import { userDbRepository } from '../../../application/repository/userDBrepository';
import { userRepositoryMongoDB } from '../../database/mongodb/repositories/userRepoMongoDB';
const paymentRouter = () =>{
    const router = express.Router()
    const controller = paymentController(
        paymentServiceInterface,
        paymentService,
        userDbRepository,
        userRepositoryMongoDB
    );


    router.get('/stripe/get-config', controller.getConfig);
    router.post('/stripe/create-payment-intent', controller.createPaymentIntent);

    return router;

}

export  default paymentRouter
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { createPaymentIntentU,getConfigU } from "../../application/useCase/auth/paymentAuth";
import { PaymentServiceInterface } from "../../application/services/paymentServiceInterface";
import { PaymentServieImpl } from "../../frameworks/services/paymentService";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/userRepoMongoDB";
import { UserDbInterface } from "../../application/repository/userDBrepository";

const paymentController= (
    paymentServiceInterface: PaymentServiceInterface ,
    paymentServiceImpl: PaymentServieImpl,
    userDbRepositoryInterface: UserDbInterface,
    userDbRepositoryMongoDb:UserRepositoryMongoDB
)=>{

    const paymentService = paymentServiceInterface(paymentServiceImpl());
    const dbRepositoryUser = userDbRepositoryInterface(userDbRepositoryMongoDb());


    const getConfig = asyncHandler(async (req: Request, res: Response) => {
        const config = getConfigU(paymentService);
        res.status(200).json({
          status: 'success',
          message: 'Successfully completed payment',
          data: config
        });
      });

    const createPaymentIntent = asyncHandler(
        async (req: Request, res: Response) => {
        //   const { courseId }: { courseId: string } = req.body;
        const { person, packageId} = req.body
        console.log(req.body)
          const response = await createPaymentIntentU(
            packageId,
            person,
            dbRepositoryUser,
            paymentService
          );
          const { client_secret } = response;
          res.status(200).json({
            status: 'success',
            message: 'Successfully completed payment',
            data: {
              clientSecret: client_secret
            }
          });
        }
      );

      return {
        getConfig,
        createPaymentIntent
      };
}

export default paymentController;
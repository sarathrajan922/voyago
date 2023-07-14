import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { PaymentServiceInterface } from "../../services/paymentServiceInterface";
import { UserDbInterface } from "../../repository/userDBrepository";


export const createPaymentIntentU = async (
    packageId:string,
    person: string,
    userDbRepository:ReturnType<UserDbInterface>,
    paymentService: ReturnType<PaymentServiceInterface>
  ) => {
    
    if (!packageId) {
      throw new AppError(
        'Please provide valid payment information',
        HttpStatus.BAD_REQUEST
      );
    }

    const amount:any = await userDbRepository.getPrice(packageId)
    console.log("first")
    console.log(amount)
    let price: number;
    if(amount){
        const count = parseInt(person)
        price = amount?.price* count
        console.log(price)
    }else{
        throw new AppError('someting went wrong',HttpStatus.INTERNAL_SERVER_ERROR)
    }



    const response = await paymentService.createPaymentIntent(price);
    return response;
  };
  
  export const getConfigU = (
    paymentService: ReturnType<PaymentServiceInterface>
  ) => paymentService.getConfig();
  
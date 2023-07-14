import { PaymentServieImpl } from "../../frameworks/services/paymentService";

export const paymentServiceInterface = (
    service: ReturnType<PaymentServieImpl> 
)=>{
    const createPaymentIntent = async (amount:number) => await service.createPaymentIntent(amount);
    const getConfig = () => service.getConfig()

    return {
        createPaymentIntent,
        getConfig
      };
}

export type PaymentServiceInterface = typeof paymentServiceInterface;
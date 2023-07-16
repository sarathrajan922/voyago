import { AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";


import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";

const api = userSetupAxiosInterceptors();



export const userPaymentSuccess = async(tourId: any)=>{
    const obj = {
        tourId
    }
    try{
        const config : AxiosRequestConfig = {
            url: BASE_URL+urls.USER_PAYMENT_STATUS_CHANGE,
            method: 'post',
            data: obj
        }
        const response = await api(config)
        return response.data
    }catch(err:any){
        if(err.message === 'Request failed with status code 304'){
            throw new Error('not modified payment status! ')
        }else{
            throw new Error('something went wrong!')
        }
    }
}
import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import adminSetupAxiosInterceptors from "../../interceptors/adminAxiosInterceptor";
const api = adminSetupAxiosInterceptors();

export const getAllBookinStat = async()=>{
    try{
        const config: AxiosRequestConfig= {
            url: BASE_URL+urls.ADMIN_GET_BOOKING_STAT,
            method: 'get'
        }
        const response = await api(config);
        return response?.data?.result
    }catch(err:any){
        if(err.message === 'Request failed with status code 404'){
            throw new Error('data not found')
        }else{
            throw new Error('something went wrong!')
        }
    }
}
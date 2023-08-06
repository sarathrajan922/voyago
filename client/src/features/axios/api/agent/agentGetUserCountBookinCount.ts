import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors();

export const getUserCountAndBookingCount = async()=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.AGENT_GET_USERCOUNT_BOOKINGCOUNT,
            method: 'get'
        }
        const response = await api(config)
        return response?.data?.result
    }catch(err:any){
        if(err.message === 'Request failed with status code 404'){
            throw new Error('could not find booking count and user count')
        }else{
            throw new Error('something went wrong! while fetching usercount and agent booking  count')
        }
    }
}
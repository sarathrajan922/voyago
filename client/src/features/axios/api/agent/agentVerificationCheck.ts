import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors()

export const agentVerificationCheck= async ()=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.AGENT_VERIFICATION_CHECK,
            method: 'get'
        }
        const response = await api(config)
        return response?.data
    }catch(err:any){
        throw new Error('something went wrong!')
    }
}


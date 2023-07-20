import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors();

export const updateAgentProfile = async(editedData: any)=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.AGENT_UPDATE_PROFILE,
            method: 'put',
            data: editedData
        }

        const response = await api(config)
        return response?.data
    }catch(error:any){
        if(error.message === 'Request failed with status code 304'){
            throw new Error('your profile not updated,Try again!')
        }else{
            throw new Error('something went wrong! Try again Later!')
        }
    }
}
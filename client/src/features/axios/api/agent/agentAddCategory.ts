import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";


interface FomValues{
    name: string;
}

const api = agentSetupAxiosInterceptors()
export const addCategory = async (values: FomValues )=> {
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.AGENT_ADD_CATEGORY,
            method: 'post',
            data: values
        };
        const response = await api(config)
        return response?.data
    }catch(error:any){
        if(error.message === 'Request failed with status code 409'){
            throw new Error('This category is already exists!')
        }else{
            throw new Error('Failed to add category,Try again!')
        }
    }
}

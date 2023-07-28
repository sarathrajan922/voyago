import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";

const api = userSetupAxiosInterceptors();

export const getAllConversation = async(commnityId: string)=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_GET_ALL_CONVERSATION_COMMUNITY+commnityId,
            method: 'get'
        }
        
        const response = await api(config)
        return response?.data?.result
    }catch(err:any){
        throw new Error('No conversation found!')
    }
}
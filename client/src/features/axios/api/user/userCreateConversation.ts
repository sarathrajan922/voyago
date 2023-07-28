import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";
const api= userSetupAxiosInterceptors();

export const userCreateConversation = async(conversationObj:any)=>{
    try{
        const config:AxiosRequestConfig = {
            url: BASE_URL+urls.USER_CREATE_CONVERSATION,
            method: 'post',
            data: conversationObj
        }

        const response = await api(config)
        return response?.data
    }catch(e:any){
        if(e.message === 'Request failed with status code 304'){
            throw new Error('conversation could not created!')
        }else{
            throw new Error('something went wrong!')
        }
    }
}
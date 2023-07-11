import {AxiosRequestConfig} from "axios";

import BASE_URL,{urls} from "../../../../config";
import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";

const api = userSetupAxiosInterceptors()

export const getUserDetails = async(userId:string)=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_GET_USER_DETAILS+userId,
            method: 'post'
        }

        const response = await api(config)
        return response?.data

    }catch(error:any){
        if(error.message === 'Request failed with status code 401'){
            throw new Error('user not found!')
        }
    }
}

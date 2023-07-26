import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";
const api = userSetupAxiosInterceptors();

export const GetAllCommunity = async()=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_GET_ALL_COMMUNITIES,
            method: 'get'
        }

        const response = await api(config)
        return response?.data?.result
    }catch(error:any){
        if(error.message === 'Request failed with status code 404'){
            throw new Error('No Communities found in DB')
        }else{
            throw new Error('something went wrong!')
        }
    }
}
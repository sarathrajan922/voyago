import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";


const api = userSetupAxiosInterceptors()

export const userProfileUpdate = async(values: any)=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_UPDATE_PROFILE,
            method: 'put',
            data: values
        }

        const response = await api(config)
        return response?.data
    }catch(error:any){
        if(error.message === 'Request failed with status code 401'){
            throw new Error('user not found in this id')
        }else{
            throw new Error('something went wrong!')
        }
    }
}
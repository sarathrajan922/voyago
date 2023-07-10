import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";

const api = userSetupAxiosInterceptors()
export const userGetAllPackges = async ()=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_GET_ALL_PACKAGES,
            method: 'get'
        }

        const response = await api(config);
        return response?.data
    }catch(error:any){
        if(error.message === 'Request failed with status code 404'){
            throw new Error('Packages not found!')
        }else{
            throw new Error('somthing went wrong ,Try again!')
        }
    }
}
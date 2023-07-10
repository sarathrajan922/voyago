import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";

const api = userSetupAxiosInterceptors()
export const bookPackage =async (formValues: any)=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_BOOK_PACKAGE,
            method: 'post',
            data:formValues
        }

        const response = await api(config)
        return response?.data
    }catch(error:any){
     throw new Error('something went wrong! Try again Later!')
    }
}
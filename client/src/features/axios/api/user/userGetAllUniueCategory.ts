import {AxiosRequestConfig} from 'axios';
import BASE_URL, { urls } from '../../../../config';
import userSetupAxiosInterceptors from '../../interceptors/userAxiosInterceptor';
const api = userSetupAxiosInterceptors();

export const userGetAllUniqueCategory = async()=>{
    try{
        const config:AxiosRequestConfig = {
            url: BASE_URL+urls.USER_GET_ALL_UNIQUE_CATEGORIES,
            method: 'get'
        }
        const response = await api(config)
        return response?.data?.result
    }catch(err:any){
        if(err.message === 'Request failed status code 404'){
            throw new Error('could not find unique category')
        }else{
            throw new Error('something went wrong!')
        }
    }
}
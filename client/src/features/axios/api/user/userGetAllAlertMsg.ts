import {AxiosRequestConfig} from 'axios'
import BASE_URL,{urls} from '../../../../config'
import userSetupAxiosInterceptors from '../../interceptors/userAxiosInterceptor'
const api = userSetupAxiosInterceptors()

export const getAllAlertMessage = async()=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_GET_ALERT_MESSAGES,
            method: 'get'
        }

        const response = await api(config)
        return  response?.data
    }catch(err:any){
        throw new Error('somthing went wrong!')
    }
}
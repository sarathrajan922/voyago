import {AxiosRequestConfig} from 'axios'
import BASE_URL,{urls} from '../../../../config'
import agentSetupAxiosInterceptors from '../../interceptors/agentAxiosInterceptor'

const api = agentSetupAxiosInterceptors()
interface AlertMsg{
   userId: string,
   packageName: string,
   price: number,
}
export const createAlertMsg = async(obj:AlertMsg)=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.AGENT_CREATE_ALERT_MESSAGE,
            method: 'post',
            data: obj
        }

        const response = await api(config)
        return response.data
    }catch(err:any){
        throw new Error('something went wrong!')
    }
}
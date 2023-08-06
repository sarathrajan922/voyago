import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";
const api = agentSetupAxiosInterceptors();

export const getAgentRevenue = async()=>{
    try{
    const config:AxiosRequestConfig = {
        url: BASE_URL+urls.AGENT_GET_REVENUE,
        method: 'get'
    }
    const response = await api(config);
    return response?.data?.result
    }catch(err:any){
    if(err.message === 'Request failed with status code 404'){
        throw new Error('could not find agent revenue')
    }else{
        throw new Error('somthing went wrong! in get agent revenue API')
    }
}
}
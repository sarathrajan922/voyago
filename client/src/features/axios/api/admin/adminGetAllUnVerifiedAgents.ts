import axios,{ AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

export const adminUnVerifedAgents = async ()=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.ADMIN_GET_ALL_UNVERIFIED_AGENTS,
            method: 'get'
        };
        const response = await axios(config)
        return response?.data
    }catch(error: any){
        if(error.message === 'Request failed with status code 404'){
            throw new Error('No agents found!')
        }else{
            throw new Error('Fetching unVerified agents failed !')
        }
    }
}
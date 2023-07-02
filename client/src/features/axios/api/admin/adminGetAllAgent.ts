import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";



export const getAgents = async ()=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.ADMIN_GET_ALL_AGENTS,
            method: 'get'
        };
        const response = await axios(config)
        return response?.data
    }catch(error: any){
        if(error.message === 'Request failed with status code 304'){
            throw new Error('No agents found!')
        }else{
            throw new Error('Fetching agents failed!')
        }
    }
}
import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

export const getAgentCategory = async (agentId: string)=>{
    try{
        const config: AxiosRequestConfig= {
            url: BASE_URL+urls.AGENT_GET_ALL_CATEGORY+agentId,
            method: 'get'
        };
        const  response = await axios(config)
        return response?.data
    }catch(error: any){
        throw new Error('Somthing went wrong try Again!')
    }
}
import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

export const agentAllPackage = async (agentId: string)=>{
    try{
        const config: AxiosRequestConfig ={
            url: BASE_URL+urls.AGENT_GET_ALL_PACKAGES+agentId,
            method: 'get',
        };
        const response = await axios(config)
        return response?.data
    }catch(error:any){
        if(error.message === 'Request failed with status code 404'){
            throw new Error('No packages Available! Please add Packages to See!')
        }else{
        throw new Error('something went wrong try Again!')
        }
    }
}
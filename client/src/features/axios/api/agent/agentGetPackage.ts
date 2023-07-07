import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";


export const agentGetPackage = async (packageId: any)=>{
    console.log(BASE_URL+urls.AGENT_GET_PACKAGE+packageId)
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.AGENT_GET_PACKAGE+packageId,
            method: 'get'
        }

        const response = await axios(config)
        return response?.data?.result
    }catch(error:any){
        if(error.message === 'Request failed with status code 404'){
            throw new Error('This package is not available!')
        }else{
            throw new Error('something went wrong! Try again!')
        }
    }
}
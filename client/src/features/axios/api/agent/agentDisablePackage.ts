import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

export const DisablePackage = async(packageId: string)=>{
    try{
        const config: AxiosRequestConfig= {
            url: BASE_URL+urls.AGENT_DISABLE_PACKAGE+packageId,
            method: 'patch'
        };
        const response = await  axios(config)
        return response?.data
    }catch(error: any){
        if(error.message === 'Request failed with status code 404'){
            throw new Error('package not found')
        }else{
            throw new Error('something went wrong, try again!')
        }
    }
}

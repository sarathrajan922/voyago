import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

export const userGetPackage = async(packageId: any)=>{
    try{
        const config : AxiosRequestConfig = {
            url: BASE_URL+urls.USER_GET_PACKAGE+packageId,
            method: 'get'
        }

        const response = await axios(config);
        return response?.data
    }catch(error:any){
        if(error.message === 'Request failed with status code 404'){
            throw new Error('Package not found in this id!')
        }else{
            throw new Error('Something went wrong! Try again Later!')
        }
    }
}
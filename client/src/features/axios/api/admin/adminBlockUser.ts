import axios, {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";


export const BlockUser = async (userId : any)=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.ADMIN_BLOCK_USER+userId,
            method : 'post'
        };

        const response = await axios(config)
        return response?.data


    }catch(error: any){
        if(error.message === 'Request failed with status code 304'){
            throw new Error('Operation failed, Try again!')
        }else{
            throw new Error('something went wrong, try again!')
        }
    }
}
import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

export const userUpdatePasswordWithEmail= async(obj:any)=>{
    try{
        const config:AxiosRequestConfig= {
            url: BASE_URL+urls.USER_UPDATE_PASSWORD_WITH_EMAIL,
            method:'post',
            data: obj
        }
        const response = await axios(config)
        return response.data
    }catch(err:any){
        throw new Error('something went wrong!')
    }
}

import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";
import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";

const api = userSetupAxiosInterceptors();
interface PasswordInterface {
    oldPassword:string;
    newPassword:string
}
export const UserUpdatePassword = async(obj:PasswordInterface)=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_UPDATE_PASSWORD,
            method: 'post',
            data: obj
        }
        const response = await api(config);
        return response.data
    }catch(err:any){
        if(err.message === 'Request failed with status code 401'){
            throw new Error('your current password is incorrect,Please check!')
        }else{
            console.log(err.message)
            throw new Error('something went wrong!while updateing password!')
        }
    }
}
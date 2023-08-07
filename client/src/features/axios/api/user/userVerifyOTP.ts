import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

export const verifyUserOtp = async(otp:number)=>{
    try{
        const obj={
            otp: otp.toString()
        }
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_VERIFY_OTP,
            method:'post',
            data: obj
        }

        const response = await axios(config)
        return response.data
    }catch(err:any){
        if(err.message === 'Request failed with status code 401'){
            throw new Error('Invalid OTP!')
        }else if(err.message === 'Request failed with status code 406'){
            throw new Error('OTP Expired!')
        }else{
            throw new Error('something went wrong try Again!')
        }
    }
}
import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

export const bookPackage =async (formValues: any)=>{
    try{
        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_BOOK_PACKAGE,
            method: 'post',
            data:formValues
        }

        const response = await axios(config)
        return response?.data
    }catch(error:any){
     throw new Error('something went wrong! Try again Later!')
    }
}
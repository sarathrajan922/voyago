import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{ urls} from "../../../../config";


//todo change the interfaces into sperate folder or file

interface LoginAdmin {
    email: string;
    password: string;
}

export const adminLogin = async (values: LoginAdmin)=>{
    try{
        const config: AxiosRequestConfig= {
            url: BASE_URL+urls.ADMIN_LOGIN,
            method: 'post',
            data: values
        };

        const response = await axios(config)
        return response?.data
    }catch(error:any){
        if(error.message === 'Request failed with status code 404'){
            throw new Error('No Admin in this Email!');
                }if(error.message === 'Request failed with status code 401'){
                    throw new Error('Incorrect Password!');
                }else{
                    throw new Error('Login failed!,try again.')
                }
    }
}
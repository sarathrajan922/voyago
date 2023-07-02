import axios,{AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";


//todo change the intterface into separate file of folder


export const  verifyAgent = async (agentId: any)=>{
    try{
    const config: AxiosRequestConfig = {
        url: BASE_URL+urls.ADMIN_VERIFY_AGENTS+agentId,
        method: 'post'
    };
    const response = await axios(config)
    return response?.data
}catch(error:any){
    if(error.message === 'Request failed with status code 304'){
        throw new Error('Operation failed, Try again!')
    }else{
        throw new Error('Something went wrong, try again!')
    }
}
}
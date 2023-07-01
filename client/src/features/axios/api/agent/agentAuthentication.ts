import axios,{ AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";


//todo change the interfaces into sperate folder or file

interface AgentRegister{
    firstName: string;
  lastName: string;
  email: string;
  mobile: any;
  password: string;
  idProof_img?: File | null;
}


export const registerAgent = async (values: any)=>{
    try{
        const config: AxiosRequestConfig= {
            url: BASE_URL+urls.AGENT_SIGNUP,
            method: 'post',
            data: values
        };

        const response  = await axios(config)
        return response?.data
    }catch(error: any){
        if(error.message === 'Request failed with status code 409'){
            throw new Error('Email already exists !!')
        }else{
            throw new Error('Signup failed, try again!')
        }
    }
}
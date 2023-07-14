import axios,{AxiosRequestConfig} from "axios";
import BASE_URL from "../../../../config";


export const getConfig = async()=>{
    try{
        const config: AxiosRequestConfig= {
            url: BASE_URL+'pay/stripe/get-config',
            method: 'get'
        }

        const response = await axios(config)
        return response.data
    }catch(e:any){
        throw new Error('something went wrong ')
    }
}

export const createStripePayment = async(obj:any)=>{
    console.log(obj)
    try{
        const config: AxiosRequestConfig= {
            url: BASE_URL+'pay/stripe/create-payment-intent',
            method: 'post',
            data: obj

        }

        const response= await axios(config)
        console.log(response.data)
        return response.data
    }catch(e:any){
        throw new Error('somthing went wrong')
    }
}
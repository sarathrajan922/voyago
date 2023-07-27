import {AxiosRequestConfig} from "axios";
import BASE_URL,{urls} from "../../../../config";

import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";
const api = userSetupAxiosInterceptors();

export const userJoinCommunity = async(communityId:string)=>{
    try{
        const obj = {
            communityId
        }

        const config: AxiosRequestConfig = {
            url: BASE_URL+urls.USER_JOIN_COMMUNITY,
            method: 'post',
            data: obj
        }

        const response = await api(config)
        return response?.data
    }catch(err:any){
        if(err.message === 'Request failed with status code 304'){
            throw new Error(`your already joined in this group`)
        }else{
            throw new Error(`something went wrong!`)
        }
    }
}
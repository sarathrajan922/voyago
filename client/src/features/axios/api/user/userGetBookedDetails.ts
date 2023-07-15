import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";

const api = userSetupAxiosInterceptors();

export const getBookedDetails = async (packageId: any) => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.USER_GET_TOUR_BOOKED_DETAILS + packageId,
      method: "get",
    };
    const response = await api(config);

    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 404") {
      throw new Error("data not found");
    } else {
      throw new Error("something went wrong!, Try again!");
    }
  }
};




export const getAllBookedData = async()=>{
  try{
    const config: AxiosRequestConfig = {
      url: BASE_URL+urls.USER_GET_ALL_BOOKING,
      method: 'get'
    }
    const response = await api(config)
    console.log(response?.data?.result)
    return response?.data?.result
  }catch(err:any){
    if(err.message === 'Request failed with status code 404'){
      throw new Error('No booking detils available  for this user')
    }else{
      throw new Error('something went wrong!')
    }
  }
}

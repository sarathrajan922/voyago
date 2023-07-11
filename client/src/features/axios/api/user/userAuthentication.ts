import axios,{AxiosRequestConfig} from "axios";
import BASE_URL, { urls } from "../../../../config";





//todo change the interfaces into sperate folder or file
interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;

  password: string;
}


export const registerUser = async (values: RegisterFormValues)=>{
  try{
    const config: AxiosRequestConfig = {
      url: BASE_URL+urls.USER_SIGNUP,
      method: 'post',
      data: values
    };

    const response = await axios(config)
    return response?.data
  }catch(error: any){
   
    if(error.message === 'Request failed with status code 409'){
     throw new Error('Email already exists !!!');
    }else{
      throw new Error('Signup failed ,try again')
    }
  }
}


//todo userLogin api 
interface LoginFormValues {
  email: string;
  password: string;
}

export const  userLogin = async (values: LoginFormValues)=>{
  console.log(values)
  try{
    const config: AxiosRequestConfig = {
      url: BASE_URL+urls.USER_LOGIN,
      method: "post",
      data: values
    };

    const response = await axios(config)
    return response?.data
  }catch(error:any){
    if(error.message === 'Request failed with status code 401'){
      throw new Error('Incorrect password !!')
    }
    if(error.message === 'Request failed with status code 404'){
      throw new Error('User not exist in this Email  !!')
    }if(error.message === 'Request failed with status code 406'){
      throw new Error('You Blocked by Admin!!')
    }else{
      throw new Error('Login failed, Try again')
    }
  }
}


//todo user registration api


//todo user google auth login api

export const loginWithGoogle = async( values: any)=>{
  try{
    const config: AxiosRequestConfig = {
      url: BASE_URL+urls.USER_LOGIN_WITH_GOOGLE,
      method: 'post',
      data: {
        credential:values
      }
    }

    const response = await axios(config)
    return response?.data
  }catch(error: any){
    if(error.message === 'Request failed with status code 401'){
      throw new Error('Incorrect password !!')
    }
    if(error.message === 'Request failed with status code 404'){
      throw new Error('User not exist in this Email  !!')
    }if(error.message === 'Request failed with status code 406'){
      throw new Error('You Blocked by Admin!!')
    }else{
      throw new Error('Login failed, Try again')
    }
  }
}
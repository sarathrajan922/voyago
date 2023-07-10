import axios, { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";

//todo change the interfaces into sperate folder or file

export const registerAgent = async (values: any) => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_SIGNUP,
      method: "post",
      data: values,
    };

    const response = await axios(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 409") {
      throw new Error("Email already exists !!");
    } else {
      throw new Error("Signup failed, try again!");
    }
  }
};

//todo change this interface to separate file or folder

interface agentLoign {
  email: string;
  password: string;
}

export const agentLogin = async (values: agentLoign) => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_LOGIN,
      method: "post",
      data: values,
    };

    const response = await axios(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 404") {
      throw new Error("sorry, No Account in this Email!");
    }
    if (error.message === "Request failed with status code 401") {
      throw new Error("Incorrect Password !!");
    }
    if (error.message === "Request failed with status code 406") {
      throw new Error("You blokced by Admin!");
    } else {
      throw new Error("Login failed , Try again");
    }
  }
};

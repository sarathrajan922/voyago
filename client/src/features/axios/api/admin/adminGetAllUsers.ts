import axios, { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";

//? admin get all users

export const getUsers = async () => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.ADMIN_GET_ALL_USERS,
      method: "get",
    };
    const response = await axios(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 404") {
      throw new Error("No users found!");
    } else {
      throw new Error("Fectching user details failed!");
    }
  }
};








import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import adminSetupAxiosInterceptors from "../../interceptors/adminAxiosInterceptor";

//? admin get all users

const api = adminSetupAxiosInterceptors();
export const getUsers = async () => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.ADMIN_GET_ALL_USERS,
      method: "get",
    };
    const response = await api(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 404") {
      throw new Error("No users found!");
    } else {
      throw new Error("Fectching user details failed!");
    }
  }
};

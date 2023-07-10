import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import adminSetupAxiosInterceptors from "../../interceptors/adminAxiosInterceptor";

const api = adminSetupAxiosInterceptors();

export const BlockUser = async (userId: any) => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.ADMIN_BLOCK_USER + userId,
      method: "post",
    };

    const response = await api(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 304") {
      throw new Error("Operation failed, Try again!");
    } else {
      throw new Error("something went wrong, try again!");
    }
  }
};

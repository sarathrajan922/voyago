import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import adminSetupAxiosInterceptors from "../../interceptors/adminAxiosInterceptor";

//todo change the intterface into separate file of folder

const api = adminSetupAxiosInterceptors();
export const verifyAgent = async (agentId: any) => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.ADMIN_VERIFY_AGENTS + agentId,
      method: "post",
    };
    const response = await api(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 304") {
      throw new Error("Operation failed, Try again!");
    } else {
      throw new Error("Something went wrong, try again!");
    }
  }
};

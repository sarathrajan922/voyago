import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors();
export const agentAllPackage = async () => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_GET_ALL_PACKAGES ,
      method: "get",
    };
    const response = await api(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 404") {
      throw new Error("No packages Available! Please add Packages to See!");
    } else {
      throw new Error("something went wrong try Again!");
    }
  }
};

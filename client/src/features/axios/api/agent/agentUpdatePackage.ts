import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors();
export const agentUpdatePackage = async (formData: any, packageId: any) => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_UPDATE_PACKAGE + packageId,
      method: "put",
      data: formData,
    };

    const response = await api(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 404") {
      throw new Error("Package Not updated!, Try again!");
    } else {
      throw new Error("something went wrong!, Try Again!");
    }
  }
};

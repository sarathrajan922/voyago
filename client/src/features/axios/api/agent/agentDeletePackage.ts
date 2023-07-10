import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors();
export const deletePackage = async (packageId: any) => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_DELETE_PACKAGE + packageId,
      method: "put",
    };

    const response = await api(config);
    return response?.data;
  } catch (error: any) {
    throw new Error("Something went wrong!,Try Again!");
  }
};

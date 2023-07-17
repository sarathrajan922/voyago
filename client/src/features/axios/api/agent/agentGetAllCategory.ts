import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors();
export const getAgentCategory = async () => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_GET_ALL_CATEGORY,
      method: "get",
    };
    const response = await api(config);
    return response?.data;
  } catch (error: any) {
    throw new Error("Somthing went wrong try Again!");
  }
};

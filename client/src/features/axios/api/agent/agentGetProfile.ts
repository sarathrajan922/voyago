import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors();

export const getAgentProfile = async () => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_GET_PROFILE,
      method: "get",
    };

    const response = await api(config);
    console.log(response?.data?.result)
    return response?.data?.result;
  } catch (error: any) {
    if (error.message === "Request failed with status code 404") {
      throw new Error("No agent found!");
    } else {
      throw new Error("somthing went wrong!");
    }
  }
};

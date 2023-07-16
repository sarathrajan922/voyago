import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";

import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors();

export const agentGetAllBookings = async () => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_GET_ALL_BOOKING,
      method: "get",
    };
    const response = await api(config);
    return response?.data?.result;
  } catch (error: any) {
    if (error.message === "Request failed with status code 404") {
      throw new Error("agent booking fetching failed");
    } else {
      throw new Error("something went wrong!!");
    }
  }
};

import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

const api = agentSetupAxiosInterceptors();
export const DisablePackage = async (packageId: string) => {
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_DISABLE_PACKAGE + packageId,
      method: "patch",
    };
    const response = await api(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 404") {
      throw new Error("package not found");
    } else {
      throw new Error("something went wrong, try again!");
    }
  }
};

import axios, { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";

export const agentDeleteCategory = async (obj: any) => {

  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_DELETE_CATEGORY,
      method: 'patch',
      data: obj,
    };
    const reponse = await axios(config);
    return reponse?.data;
  } catch (error: any) {
    console.log(error.message)
    throw new Error("Failed to delete Category!");
  }
};

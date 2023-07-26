import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";

import userSetupAxiosInterceptors from "../../interceptors/userAxiosInterceptor";

const api = userSetupAxiosInterceptors();

export const createCommunity = async (name: string) => {
  const obj = {
    communityName: name,
  };
  try {
    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.USER_CREATE_COMMUNITY,
      method: "post",
      data: obj,
    };
    const response = await api(config);
    return response?.data;
  } catch (err: any) {
    throw new Error("something went wrong!");
  }
};

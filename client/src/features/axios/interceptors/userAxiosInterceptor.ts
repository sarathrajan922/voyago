import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import BASE_URL from "../../../config";

const userSetupAxiosInterceptors = (): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  api.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        //uauthorized error, clear token and redirect to login page
        //call clear token function from store here
        window.location.replace("/login");
      }
      return Promise.reject(error);
    }
  );

  return api;
};





export default userSetupAxiosInterceptors;


import { AxiosRequestConfig } from "axios";
import BASE_URL, { urls } from "../../../../config";
import agentSetupAxiosInterceptors from "../../interceptors/agentAxiosInterceptor";

//todo change this interface into another foler or file
interface FormValues {
  packageName: string;
  images: FileList | null;
  description: string;
  category: string;
  locations: string;
  price: string;
  services: string;
  duration: string;
}

const api = agentSetupAxiosInterceptors();
export const agentAddPackage = async (values: FormValues) => {
  try {
    const formData = new FormData();

    formData.append("packageName", values.packageName);
    formData.append("description", values.description);
    formData.append("duration", values.duration);
    formData.append("category", values.category);
    formData.append("locations", values.locations);

    formData.append("services", values.services);
    // //! replace agentId with logged agentid
    // formData.append("agentId", "64941a796b4f3bd48f57ecfa");
    formData.append("price", values.price);
    if (values.images) {
      formData.append("images", values.images[0]);
    }

    const config: AxiosRequestConfig = {
      url: BASE_URL + urls.AGENT_ADD_PACKAGE,
      method: "post",
      data: formData,
    };

    const response = await api(config);
    return response?.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 409") {
      throw new Error("This Package Name is Already Exists!");
    } else {
      throw new Error("Something went wrong ,Try again!");
    }
  }
};

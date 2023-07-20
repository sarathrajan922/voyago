import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CategoryApiResponse } from "../../../API/type/getAllCategory";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getAgentCategory } from "../../../features/axios/api/agent/agentGetAllCategory";
import { useNavigate, useParams } from "react-router-dom";
import { agentGetPackage } from "../../../features/axios/api/agent/agentGetPackage";
import { agentUpdatePackage } from "../../../features/axios/api/agent/agentUpdatePackage";
import { deletePackage } from "../../../features/axios/api/agent/agentDeletePackage";
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

const EditTourPackageForm: React.FC = () => {
  const navigate = useNavigate();
  const id = useParams();
  const [packageDetails, setPackageDetails] = useState<FormValues | null>(null);
  const [packageImg, SetPackageImg] = useState<string>("");

  useEffect(() => {
    const fetchPackage = async (packageId: any) => {
      await agentGetPackage(packageId)
        .then((data) => {
          setPackageDetails(data);
          SetPackageImg(data?.images);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchPackage(id?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (packageDetails) {
      formik.setValues({
        ...formik.values,
        packageName: packageDetails.packageName ?? "",
        description: packageDetails.description ?? "",
        category: packageDetails.category ?? "",
        duration: packageDetails.duration ?? "",
        locations: packageDetails.locations ?? "",
        price: packageDetails.price ?? "",
        services: packageDetails.services ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageDetails]);

  const initialValues: FormValues = {
    packageName: "",
    images: null,
    description: "",
    category: "",
    duration: "",
    locations: "",
    price: "",
    services: "",
  };

  const validationSchema = Yup.object({
    packageName: Yup.string().required("Package name is required"),
    // images: Yup.mixed().required("Images are required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    locations: Yup.string().required("Locations are required"),
    services: Yup.string().required("services are required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be positive"),
  });

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("packageName", values.packageName);
    formData.append("description", values.description);
    formData.append("duration", values.duration);
    formData.append("category", values.category);
    formData.append("locations", values.locations);
    formData.append("services", values.services);
    //! replace agentId with logged agentid
    formData.append("agentId", "64941a796b4f3bd48f57ecfa");
    formData.append("price", values.price);
    if (values.images) {
      formData.append("images", values.images[0]);
    } else {
      formData.append("images", packageImg);
    }

    await agentUpdatePackage(formData, id?.id)
      .then(() => {
        notify("package updated successfully!", "success");
        setTimeout(() => {
          navigate("/agent/packages");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const [agentCategory, setAgentCategory] = useState<
    CategoryApiResponse[] | null
  >(null);

  useEffect(() => {
    const Category = async () => {
      const data: any = await getCategory();
      setAgentCategory(data?.result);
    };
    Category();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategory = async () => {
    
  
    return await getAgentCategory()
      .then((response) => {
        return response;
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  const packageDelete = async () => {
    return await deletePackage(id?.id)
      .then(() => {
        notify('Your Package Deleted Successfully!','success')
        setTimeout(() => {
          navigate("/agent/packages");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between h-28 mb-4 rounded bg-gray-50">
            <div className="p-10">
              <h1 className="font-bold text-2xl">Edit Tour Package</h1>
            </div>

            <div className="pr-10">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Update Package
              </button>
            </div>
            <div className="pr-10">
              <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                type="button"
              >
                Delete Package
              </button>

              <div
                id="popup-modal"
                tabIndex={-1}
                className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div className="relative w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="popup-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                      <svg
                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this Package?
                      </h3>
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        onClick={()=>{
                          packageDelete()
                        }}
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={()=>{
                        notify('package Not delelted!', 'success')
                      }}
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* second section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex-col items-center justify-between rounded h-28 dark:bg-gray-800">
              <div className="ps-4 pt-4">
                <label
                  htmlFor="packageName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Package Name:
                </label>
                <input
                  type="text"
                  id="packageName"
                  name="packageName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your package name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.packageName}
                />
                {formik.touched.packageName && formik.errors.packageName && (
                  <div className="text-red-500">
                    {formik.errors.packageName}
                  </div>
                )}
              </div>
            </div>
            <ToastContainer />
            <div className="flex-col items-center justify-center ms-3 rounded h-28 dark:bg-gray-800">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload Images
              </label>

              <input
                type="file"
                id="images"
                name="images"
                className="ps-5 pt-2"
                onChange={(event) => {
                  formik.setFieldValue("images", event.currentTarget.files);
                }}
              />

              {formik.touched.images && formik.errors.images && (
                <div className="text-red-500">{formik.errors.images}</div>
              )}
            </div>
            <div>
              <img className="w-22 h-24 rounded " src={packageImg} alt=""></img>
            </div>
          </div>

          {/* third section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-between rounded h-28 dark:bg-gray-800">
              <div className="p-5">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-col items-center justify-center ms-3 rounded h-28 dark:bg-gray-800">
              <div className="ps-4 pt-4">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category:
                </label>
                <select
                  id="category"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                >
                  <option value="" disabled selected>
                    Choose a category
                  </option>
                  {agentCategory?.map((x, index) => {
                    return (
                      <option key={index} value={x.name}>
                        {x.name}
                      </option>
                    );
                  })}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <div className="text-red-500">{formik.errors.category}</div>
                )}
              </div>
            </div>
          </div>

          {/* fourth section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-between rounded h-28 dark:bg-gray-800">
              <div className="p-5">
                <label
                  htmlFor="locations"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Locations:
                </label>
                <textarea
                  id="locations"
                  name="locations"
                  className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Separate your locations using ','"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.locations}
                ></textarea>
                {formik.touched.locations && formik.errors.locations && (
                  <div className="text-red-500">{formik.errors.locations}</div>
                )}
              </div>
            </div>

            <div className="flex-col items-center justify-center ms-3 rounded h-28 dark:bg-gray-800">
              <div className="ps-4 pt-4">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter the price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-500">{formik.errors.price}</div>
                )}
              </div>
            </div>
          </div>

          {/* fifth section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-between rounded h-28 dark:bg-gray-800">
              <div className="p-5">
                <label
                  htmlFor="services"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Services:
                </label>
                <textarea
                  id="services"
                  name="services"
                  className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Separate your services using ','"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.services}
                ></textarea>
                {formik.touched.services && formik.errors.services && (
                  <div className="text-red-500">{formik.errors.services}</div>
                )}
              </div>
            </div>
            <div className="flex-col items-center justify-center ms-3 rounded h-28 dark:bg-gray-800">
              <div className="ps-4 pt-4">
                <label
                  htmlFor="duration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Duration:
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter No:of days"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.duration}
                />
                {formik.touched.duration && formik.errors.duration && (
                  <div className="text-red-500">{formik.errors.duration}</div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTourPackageForm;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CategoryApiResponse } from "../../../API/type/getAllCategory";

import { agentAddPackage } from "../../../features/axios/api/agent/agentAddPackage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getAgentCategory } from "../../../features/axios/api/agent/agentGetAllCategory";
import { agentVerificationCheck } from "../../../features/axios/api/agent/agentVerificationCheck";
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

const AddTourPackageForm: React.FC = () => {
 
  const [isVerified, setIsVerified] = useState<boolean | null >(null);

  useEffect(()=>{
    const checkVerified = async()=>{
    const result = await agentVerificationCheck()
    if(result?.result){
      setIsVerified(true)
    }else{
      setIsVerified(false)
    }
    }
  checkVerified()
  },[])

  

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
    images: Yup.mixed().required("Images are required"),
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
    // Handle form submission

    await agentAddPackage(values)
      .then(() => {
        notify("Package added successfully!", "success");
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

  




  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        {isVerified ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between h-28 mb-4 rounded bg-gray-50">
              <div className="p-10">
                <h1 className="font-bold text-2xl">Add Tour Package</h1>
              </div>

              <div className="pr-10">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Publish
                </button>
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
                    <div className="text-red-500">
                      {formik.errors.locations}
                    </div>
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

            {/* fourth section */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* <div className="flex items-center justify-between rounded h-28 dark:bg-gray-800">
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
            </div> */}
            </div>
          </form>
        ) : (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Not Verified!</span> Your
              verification is under process.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTourPackageForm;

import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import { getAgentProfile } from "../../../features/axios/api/agent/agentGetProfile";
import { AgentDataApi } from "../../../API/type/getAgentData";
import { updateAgentProfile } from "../../../features/axios/api/agent/agentUpdateProfile";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string().required("Password is required"),
  mobile: Yup.number().required("Mobile is required"),
  repeat_password: Yup.string()
    .test("password-match", "Passwords must match", function (value) {
      return value === this.resolve(Yup.ref("password")) || value === null;
    })
    .required("Confirm password is required"),
});
type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: any;
  password: string;
  repeat_password: string;
};

const AgentProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);
  const [agentData, setAgentData] = useState<FormValues>({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    repeat_password: "",
  });

  console.log(agentData);

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };
  useEffect(() => {
    const getAgent = async () => {
      const data: AgentDataApi = await getAgentProfile();
      if (data) {
        const mobile = data.mobile.toString();
        setAgentData({
          first_name: data?.firstName ?? "",
          last_name: data?.lastName ?? "",
          email: data?.email ?? "",
          mobile: mobile,
          password: "",
          repeat_password: "",
        });

        setIsLoad(true);
      } else {
        setIsLoad(false);
      }
    };
    getAgent();
  }, []);

  const onSubmit = async (values: FormValues) => {
    const obj = {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      password: values.password,
      mobile: values.mobile,
    };

    await updateAgentProfile(obj)
      .then((response) => {
        notify("profile updated successfully", "success");
        setTimeout(() => {
          navigate("/agent/profile");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  const cancelUpdate = () => {
    navigate("/agent/profile");
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center my-2 mb-5 justify-around h-16 lg:w-[30rem] w-full  md:w-1/2 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-xl font-bold text-black dark:text-gray-500">
              Agent DashBoard
            </p>
          </div>
        </div>

        {isLoad ? (
          <>
            <div className=" flex flex-col justify-center md:p-12 ">
              <div className="lg:w-[50rem] min-h-[20rem] pb-16 mt-1 min-w-[25rem] lg:mb-16 px-10 lg:ms-16 lg:h-[20rem]">
                <ToastContainer />

                <Formik
                  initialValues={agentData}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="flex items-end lg:pt-0 pt-8  justify-end w-full mb-10 ">
                      <div className="">
                        <button
                          type="submit"
                          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                        >
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            update
                          </span>
                        </button>
                      </div>
                      <div className="">
                        <button
                          onClick={cancelUpdate}
                          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                        >
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            cancel
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <Field
                          type="text"
                          name="first_name"
                          id="first_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="first_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          First name
                        </label>
                        <ErrorMessage
                          name="first_name"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <Field
                          type="text"
                          name="last_name"
                          id="last_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="last_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Last name
                        </label>
                        <ErrorMessage
                          name="last_name"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email address
                      </label>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <Field
                        type="text"
                        name="mobile"
                        id="mobile"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="mobile"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Mobile
                      </label>
                      <ErrorMessage
                        name="mobile"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Password
                      </label>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <Field
                        type="password"
                        name="repeat_password"
                        id="repeat_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Confirm password
                      </label>
                      <ErrorMessage
                        name="repeat_password"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    {/* <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button> */}
                  </Form>
                </Formik>
              </div>
            </div>
          </>
        ) : (
          <div className=" w-full flex justify-center  h-full ">
            <div className="py-52">
              <CircleLoader color="#1bacbf" />
            </div>
          </div>
        )}
      </div>
    </div>
    // <div className=" w-full flex justify-center  h-full ">
    //     <div className="py-52">
    //     <CircleLoader color="#1bacbf" />
    //     </div>
    // </div>
  );
};

export default AgentProfileEdit;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserUpdatePassword } from "../../../features/axios/api/user/userUpdatePassword";

const UserPasswordEdit: React.FC = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    password: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(5, "Password must be at least 5 characters"),
    repeatPassword: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });
  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const handleSubmit = (values: any) => {
    const obj = {
      oldPassword: values.password,
      newPassword: values.newPassword,
    };
    UserUpdatePassword(obj)
      .then(() => {
        notify("Password updated!", "success");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch((err: any) => {
        notify(err.message, "error");
        setTimeout(() => {
          navigate("/user-profile-edit");
        }, 2000);
      });
  };

  const cancelUpdate = () => {
    navigate("/profile");
  };

  return (
    <section className=" bg-white mt-0 dark:bg-gray-900">
      <div className=" px-4 mx-auto max-w-screen-xl lg:pt-0">
        <div className=" flex flex-col justify-center md:p-12 ">
          <div className="lg:w-[50rem] min-h-[20rem] pb-16 mt-1 min-w-[25rem] lg:mb-16 px-10 lg:ms-16 lg:h-[20rem]">
            <ToastContainer />
            <Formik
              initialValues={{
                password: "",
                newPassword: "",
                repeatPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
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
                  <div className="relative z-0 w-full mb-6 group">
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Current Password
                    </label>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <Field
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="newPassword"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      New Password
                    </label>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <Field
                      type="password"
                      name="repeatPassword"
                      id="repeatPassword"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="repeatPassword"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Confirm password
                    </label>
                    <ErrorMessage
                      name="repeatPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPasswordEdit;

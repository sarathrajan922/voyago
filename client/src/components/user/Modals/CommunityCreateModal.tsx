import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { ObjectSchema } from "yup";
import { createCommunity } from "../../../features/axios/api/user/userCreteCommunity";
import { ToastContainer, toast } from "react-toastify";

interface FormValues {
  communityName: string;
}

export default function ComunityCreateModal({ setModal ,setStatus }: any) {
    const navigate = useNavigate()
  const initialValues: FormValues = {
    communityName: "",
  };

  const validationSchema: ObjectSchema<FormValues> = Yup.object().shape({
    communityName: Yup.string()
      .matches(/^[A-Za-z][A-Za-z\s]*$/, "Community Name must contain only alphabets")
      .required("Please enter your community name"),
  });

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const handleSubmit = async(
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission logic here
    console.log(values.communityName);

    createCommunity(values.communityName).then((response)=>{
        notify("community created successfully", "success");
        setTimeout(()=>{
            // window.location.reload();
            setModal()
            setStatus(false)
            
            
        },2000)
    }).catch((err:any)=>{
        notify(err.message, "error");
    })


    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });


  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setModal()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
            <ToastContainer/>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Create Community
                    </Dialog.Title>

                    <form onSubmit={formik.handleSubmit}>
                      <div className="my-6">
                        <input
                          type="text"
                          id="communityName"
                          name="communityName"
                          value={formik.values.communityName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          placeholder="Enter your community name"
                        />
                        {formik.touched.communityName && formik.errors.communityName ? (
                          <div className="text-red-500">
                            {formik.errors.communityName}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex gap-4 justify-center">
                        {/* <button
          type="button"
          onClick={()=>{
           
          }}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button> */}
                        <button
                          type="submit"
                          disabled={formik.isSubmitting}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

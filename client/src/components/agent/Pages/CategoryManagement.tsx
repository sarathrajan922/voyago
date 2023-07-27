import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import {
  List,
  ListItem,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { CategoryApiResponse } from "../../../API/type/getAllCategory";
import { addCategory } from "../../../features/axios/api/agent/agentAddCategory";
import { getAgentCategory } from "../../../features/axios/api/agent/agentGetAllCategory";
import { agentDeleteCategory } from "../../../features/axios/api/agent/agentDeleteCategory";

const AgentCategory: React.FC = () => {
  const [status, setStatus] = useState(false);
  interface FormValues {
    name: string;
    agentId?: string | null;
  }
  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const validationSchema: Yup.Schema<FormValues> = Yup.object({
    name: Yup.string().matches(/^[A-Za-z]+$/, "Category Name must contain only alphabets").required("Category Name is required"),
  });
  const onSubmit = async (values: FormValues) => {
    // Add your submit logic here
    const formData = {
      name: values.name
    };

    await addCategory(formData)
      .then((response) => {
        notify("Category added successfully!", "success");
        setStatus(!status);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  const [category, setCategory] = useState<CategoryApiResponse[] | null>(null);

  useEffect(() => {
    const getCategory = async () => {
      const data: any = await getAllCategory();
      setCategory(data?.result);
    };
    getCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const data: any = await getAllCategory();
      setCategory(data?.result);
    };
    getCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const getAllCategory = async () => {
    
  return  await getAgentCategory().then((response)=>{
      return response
    }).catch((error:any)=>{
      notify(error.message, "error");
    })
    
    
  };

  const deleteCategory = async (name: string) => {
    const obj = {
      //! replace agentId with logged agent
      agentId: "64941a796b4f3bd48f57ecfa",
      categoryName: name,
    };

    await agentDeleteCategory(obj).then(()=>{
      notify('Category deleted successfully','success')
      setStatus(!status)
    }).catch((error:any)=>{
      notify(error.message,'error')
    })
    
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  Agent Category List
                </p>
              </div>
              <List>
                {category &&
                  category?.map((x, index) => {
                    return (
                      <ListItem
                        key={index}
                        ripple={false}
                        className="py-1 pr-1 pl-4 bg-white"
                      >
                        {x.name}
                        <ListItemSuffix>
                          {/*//!delete category functionality pending */}
                          <IconButton
                            onClick={() => {
                              deleteCategory(x.name);
                            }}
                            variant="text"
                            color="red"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </IconButton>
                        </ListItemSuffix>
                      </ListItem>
                    );
                  })}
              </List>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded h-full md:h-full ">
              <div className="flex flex-col items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500 mt-32">
                  Add Category
                </p>
                <Formik
                  initialValues={{
                    name: "",
                    agentId: null,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form action="">
                    <div className="flex flex-col items-center w-72 l:w-30 gap-6 mt-11">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          Category Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <button
                        type="submit"
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Add
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AgentCategory;

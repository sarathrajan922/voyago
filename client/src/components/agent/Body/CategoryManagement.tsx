import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import BASE_URL, { urls } from "../../../config";

interface FormValues {
  name: string;
  agentId?: string | null;
}

const validationSchema: Yup.Schema<FormValues> = Yup.object({
  name: Yup.string().required("Category Name is required"),
});
const onSubmit = async (values: FormValues) => {
  // Add your submit logic here
  const formData = {
    name: values.name,
    //! change the pre defined agentId
    agentId: "64941a796b4f3bd48f57ecfa"
  }

  try {
    const response = await axios.post(
      BASE_URL + urls.AGENT_ADD_CATEGORY,
      formData
    );
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

const AgentCategory: React.FC = () => {
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
                <ListItem ripple={false} className="py-1 pr-1 pl-4 bg-white">
                  Item One
                  <ListItemSuffix>
                    <IconButton variant="text" color="red">
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
                <ListItem ripple={false} className="py-1 pr-1 pl-4 bg-white">
                  Item One
                  <ListItemSuffix>
                    <IconButton variant="text" color="red">
                      <TrashIcon className="h-5 w-5 " />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
                <ListItem ripple={false} className="py-1 pr-1 pl-4 bg-white">
                  Item One
                  <ListItemSuffix>
                    <IconButton variant="text" color="red">
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
                <ListItem ripple={false} className="py-1 pr-1 pl-4 bg-white">
                  Item One
                  <ListItemSuffix>
                    <IconButton variant="text" color="red">
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
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
      </div>
    </>
  );
};

export default AgentCategory;

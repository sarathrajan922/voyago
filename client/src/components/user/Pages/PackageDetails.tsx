import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PackageDataApiResponse } from "../../../API/type/getPackage";
import { userGetPackage } from "../../../features/axios/api/user/userGetPackage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { bookPackage } from "../../../features/axios/api/user/userBookPackage";
import { useDispatch } from "react-redux";
import { setBookingDetails } from "../../../features/redux/slices/user/userBookingSlice";



const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone format")
    .required("Phone is required"),
  rooms: Yup.number().required("Number of rooms is required"),
  remember: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  rooms: "",
  remember: false,
};

const PackageDetails: React.FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();

  const [tourPackage, setTourPackage] = useState<PackageDataApiResponse | null>(
    null
  );

  useEffect(() => {
    const asynfun = async () => {
      await userGetPackage(id)
        .then((response) => {
          setTourPackage(response?.result);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    };
    asynfun();
  }, []);

  const handleSubmit = async (values: any) => {
    console.log(values);
    // Perform your form submission logic here
    const date = new Date();
    const formattedDate = date.toISOString();

    const obj = {
      firstName: values.first_name,
      lastName: values.last_name,
      Email: values.email,
      rooms: values.rooms,
      packageId: id,
      travelDate: formattedDate
    }
       

    dispatch(setBookingDetails(obj))
 
    //? api call for book package 

    await bookPackage(obj)
      .then(() => {
        navigate("/payment");
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div className=" flex flex-col justify-evenly  p-10 md:p-12 mb-8">
          <h4 className="text-center text-gray-900 dark:text-white text-2xl md:text-2xl font-extrabold mb-2">
            Top <span className="text-blue-800">trending</span> packages
          </h4>

          <div>
            <img
              className="w-full max-h-[20rem] overflow-hidden object-cover"
              src={tourPackage?.images}
              // src="https://images.unsplash.com/photo-1602828889956-45ec6cee6758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
              alt=""
            />
          </div>

          <div className="grid lg:grid-cols-2 justify-items-center ">
            <div className="py-5 px-2 max-h-[45rem]">
              <div className="rounded overflow-hidden hover:shadow-lg mt-6 ">
                {/* <div className="py-3 px-3 text-center text-lg font-semibold text-gray-900 dark:text-white">
                  Package Details
                </div> */}
                <div className="ms-2 px-1">
                  <h2 className="font-semibold mt-3 mb-1">
                    {tourPackage?.packageName ?? "packageName"}
                  </h2>

                  <p className="text-l text-gray-500 dark:text-white mt-1 mb-2">
                    {tourPackage?.description ?? "description "}
                  </p>
                  <span className=" font-semibold text-gray-900 dark:text-white mt-1 ">
                    Category:
                  </span>
                  <span className="text-gray-500">
                    {tourPackage?.category ?? "cateory"}
                  </span>
                  <br />
                  <span className="font-semibold mb-1">Locations:</span>
                  <span className="text-gray-500">
                    {tourPackage?.locations ?? "locations"}
                  </span>
                  <br />
                  <span className="font-semibold">Services:</span>
                  <span className="text-gray-500">
                    {tourPackage?.services ?? "services"}
                  </span>
                  <br />

                  <div className="py-3 px-3 text-end  text-lg font-sans text-gray-900 dark:text-white">
                    Starting from{" "}
                    <span className="text-gray-500">
                      ₹{tourPackage?.price ?? "00.00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5 px-2 max-h-[45rem]">
              <div className="rounded  hover:shadow-lg mt-6 px-5">
                {/* <div className="py-3 px-3 text-center font-semibold">
                  Booking Form
                </div> */}

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          First name
                        </label>
                        <Field
                          type="text"
                          id="first_name"
                          name="first_name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="John"
                        />
                        <ErrorMessage
                          name="first_name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Last name
                        </label>
                        <Field
                          type="text"
                          id="last_name"
                          name="last_name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Doe"
                        />
                        <ErrorMessage
                          name="last_name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter valid Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Mobile
                        </label>
                        <Field
                          type="tel"
                          id="phone"
                          name="phone"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="123-45-678"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="rooms"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          No:of rooms
                        </label>
                        <Field
                          type="number"
                          id="rooms"
                          name="rooms"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="How many room?"
                        />
                        <ErrorMessage
                          name="rooms"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <Field
                          type="checkbox"
                          id="remember"
                          name="remember"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        I agree with the{" "}
                        <a
                          href="#"
                          className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                          terms and conditions
                        </a>
                        .
                      </label>
                      <ErrorMessage
                        name="remember"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="py-3 px-3 text-center">
                      <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Book
                      </button>
                    </div>
                  </Form>
                </Formik>

                {/* <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter valid Email"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mobile
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="123-45-678"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rooms"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        No:of rooms
                      </label>
                      <input
                        type="number"
                        id="rooms"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="How many room?"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      I agree with the{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                      >
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div>
                  <div className="py-3 px-3 text-center">
                    <button
                      type="submit"
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Book
                    </button>
                  </div>
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;

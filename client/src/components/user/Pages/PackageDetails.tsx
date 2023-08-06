/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PackageDataApiResponse } from "../../../API/type/getPackage";
import { userGetPackage } from "../../../features/axios/api/user/userGetPackage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { setBookingDetails } from "../../../features/redux/slices/user/userBookingSlice";
import TourConfirmationModal from "../Modals/TourConfirmModal";

const PackageDetails: React.FC = () => {
  const [person, setPerson] = useState(1); // Initial value for rooms
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [tot, setTot] = useState<number>(0);

  const formattedTotal = total.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const formattedTot = tot.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const handleIncrement = () => {
    if (person >= 15) {
      setPerson(15);
    } else {
      setPerson(person + 1);
    }
  };

  const handleDecrement = () => {
    if (person > 1) {
      setPerson(person - 1);
    }
  };

  useEffect(() => {
    if (person === 0) {
      setErrorMsg("No:of person is required");
    }
    if (person > 15) {
      setErrorMsg("Maximum 15 person only");
    } else {
      setErrorMsg("");
    }
    setTotal(person * tot);
  }, [person, tot]);

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone format")
      .required("Phone is required"),
    remember: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
    person: Yup.number().required("please fill this.."),
  });

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    person: person,
    remember: false,
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  interface BookedData {
    firstName: string;
    lastName: string;
    Email: string;
    person: string;
    packageId: string;
    travelDate: string;
    agentId: string;
  }

  const [tourPackage, setTourPackage] = useState<PackageDataApiResponse | null>(
    null
  );
  

  useEffect(() => {
    const asynfun = async () => {
      await userGetPackage(id)
        .then((response) => {
          const data = response?.result;
          setTourPackage(data);
          setTotal(data?.price);
          setTot(data?.price);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    };
    asynfun();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookedDetails, setBookedDetails] = useState<BookedData>();

  const bookingHandler = async (values: any) => {
    const date = new Date();
    const formattedDate = date.toISOString();

    const obj = {
      firstName: values.first_name,
      lastName: values.last_name,
      Email: values.email,
      person: person.toString() ?? "",
      packageId: id,
      travelDate: formattedDate,
      agentId: tourPackage?.agentId,
    };

    setBookedDetails({
      firstName: values.first_name,
      lastName: values.last_name,
      Email: values.email,
      person: person.toString() ?? "",
      packageId: id ?? "",
      travelDate: formattedDate,
      agentId: tourPackage?.agentId ?? "",
    });

    dispatch(setBookingDetails(obj));

    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  };

  const handlePersonChange = (e: any) => {
    const inputValue = parseInt(e.target.value);

    if (inputValue === 0) {
      setPerson(1);
    }
    setPerson(inputValue);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      {isModalOpen ? (
        <TourConfirmationModal packageDetails={bookedDetails} packageId={id} />
      ) : (
        ""
      )}

      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div className=" flex flex-col justify-evenly  p-10 md:p-12 mb-8">
          <h4 className="text-center text-gray-900 dark:text-white text-2xl md:text-2xl font-extrabold mb-2">
            Top <span className="text-blue-800">trending</span> packages
          </h4>

          <div>
            <img
              className="w-full max-h-[20rem] overflow-hidden object-cover"
              src={tourPackage?.images}
              alt=""
            />
          </div>

          <div className="grid lg:grid-cols-2 justify-items-center ">
            <div className="py-5 px-2 max-h-[45rem]">
              <div className="rounded overflow-hidden hover:shadow-lg mt-6 ">
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
                  <span className="font-semibold mb-1">Locations: </span>
                  <span className="text-gray-500">
                    {tourPackage?.locations ?? "locations"}
                  </span>
                  <br />
                  <span className="font-semibold">Services: </span>
                  <span className="text-gray-500">
                    {tourPackage?.services ?? "services"}
                  </span>
                  <br />
                  <span className="font-semibold">Duration: </span>
                  <span className="text-gray-500">
                    {tourPackage?.duration ?? "services"} Days
                  </span>
                  <br />
                  <div className="py-3 px-3 text-end  text-lg font-serif text-gray-900 dark:text-white">
                    Starting from{" "}
                    <span className="text-green-500 font-serif">
                      {formattedTot}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5 px-2 max-h-[45rem]">
              <div className="rounded  hover:shadow-lg mt-6 px-5">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={bookingHandler}
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
                          No:of Person
                        </label>
                        <div className="flex">
                          <button
                            type="button"
                            onClick={handleDecrement}
                            className="px-5 mr-2 py-1 bg-gray-200  text-gray-700 rounded focus:outline-none"
                          >
                            -
                          </button>
                          <Field
                            type="number"
                            id="person"
                            min="1"
                            max="15"
                            name="person"
                            required
                            value={person}
                            onChange={handlePersonChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5 w-20 text-center outline-none"
                            placeholder=""
                          />

                          <button
                            type="button"
                            onClick={handleIncrement}
                            className="px-5 mx-2 py-1 bg-gray-200 text-gray-700 rounded focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-red-500 text-sm ">
                          {errorMsg}
                        </span>
                      </div>

                      <div>
                        <div className="w-[8rem] h-[2rem] lg:mt-8 mt-2">
                          <span className="pt-10 ps-2 text-m  font-serif">
                            Total:
                          </span>
                          <span className="pr-4 text-l text-green-400">
                            {formattedTotal}
                          </span>
                        </div>
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
                        <Link
                          to="#"
                          className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                          terms and conditions
                        </Link>
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
                        data-modal-target="popup-modal"
                        data-modal-toggle="popup-modal"
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Book
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;

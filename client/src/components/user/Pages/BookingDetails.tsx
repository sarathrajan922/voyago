/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { getAllBookedData } from "../../../features/axios/api/user/userGetBookedDetails";

interface PackageId {
  _id: string;
  agentId: string;
  packageName: string;
  description: string;
  price: number;
  images: string;
  duration: number;
  category: string;
  locations: string;
  services: string;
}
interface Result {
  _id: string;
  firstName: string;
  lastName: string;
  Email: string;
  travelDate: string;
  person: number;
  packageId: PackageId;
  userId: string;
  payment: string;
  __v: number;
}
const BookingDetailsComponent: React.FC = () => {
  const [bookedDetails, setBookedDetails] = useState<Result[] | null>(null);
  const [modalData, setModalData] = useState<Result | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const viewSummary = (x: Result) => {
    setModalData(x);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const getBookingDetails = async () => {
      const data = await getAllBookedData();
      console.log(data);
      setBookedDetails(data.reverse());
    };
    getBookingDetails();
  }, []);

  return (
    <section className=" bg-white mt-0 dark:bg-gray-900">
      <div className=" px-4 mx-auto max-w-screen-xl  lg:pt-0">
        <div className=" flex flex-col my-14 justify-center md:p-12 ">
          <div className="lg:w-[60rem] b min-h-[20rem] pb-16 mt-1 min-w-[25rem] lg:mb-16 px-10 lg:ms-16 lg:h-[20rem]">
            <h2 className="text-center text-gray-900  dark:text-white text-m md:text-xl font-extrabold mb-5">
              <span className="text-black-500">Booking Details</span>
            </h2>
            {bookedDetails ? (
              <>
                <div className="relative overflow-x-auto lg:mt-4 mt-10 shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Package Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Person
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Payment
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">view</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookedDetails
                        ?.slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((x, index) => {
                          console.log(x);
                          const travelDate = new Date(x?.travelDate);
                          const formattedTravelDate = travelDate.toLocaleString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          );
                          return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <th
                                scope="row"
                                className="px-6 py-4 font-bold text-m text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {x?.packageId?.packageName.toUpperCase()}
                              </th>
                              <td className="px-6 py-4">{x?.Email}</td>
                              <td className="px-6 py-4">{x?.person}</td>
                              <td className="px-6 py-4">{x?.payment}</td>
                              <td className="px-6 py-4 text-green-400">
                                {(
                                  x?.person * x?.packageId?.price
                                ).toLocaleString("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                })}
                              </td>
                              <td className="px-6 py-4">
                                {formattedTravelDate}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  data-modal-target="staticModal"
                                  data-modal-toggle="staticModal"
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                  onClick={() => {
                                    viewSummary(x);
                                  }}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      {/* loop end */}
                    </tbody>
                  </table>
                </div>
                <div className="justify-center mx-[35%] lg:mx-[40%]">
                  <div className="flex mt-10">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center px-3 h-8 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </button>

                    <button
                      onClick={goToNextPage}
                      disabled={
                        currentPage ===
                        Math.ceil(bookedDetails?.length ?? 0 / itemsPerPage)
                      }
                      className="flex items-center justify-center px-3 h-8 ml-3 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>No booking detials available</div>
            )}
          </div>
          {/*  modal */}

          <div
            id="staticModal"
            data-modal-backdrop="static"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Booking summary
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="staticModal"
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
                </div>

                <div className="p-6 space-y-6">
                  <div className="lg:max-w-[10rem] lg:max-h-[8rem]  lg:flex">
                    <img src={modalData?.packageId?.images} alt="" />
                    <div className="lg:ms-10 lg:mt-0 mt-3">
                      <span className="text-sm font-bold">PackageName:</span>
                      <span className="text-sm font-bold text-gray-500">
                        {modalData?.packageId.packageName.toUpperCase()}
                      </span>
                      <br />
                      <span className="text-sm font-bold">Date:</span>
                      <span className="text-sm font-bold text-gray-500">
                        {modalData?.travelDate}
                      </span>
                      <br />
                      <span className="text-sm font-bold">Category:</span>
                      <span className="text-sm font-bold text-gray-500">
                        {modalData?.packageId?.category}
                      </span>
                      <br />
                      <span className="text-sm font-bold">Duration:</span>
                      <span className="text-sm font-bold text-gray-500">
                        {modalData?.packageId?.duration}
                      </span>
                      <br />
                    </div>
                  </div>

                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {modalData?.packageId?.description}
                  </p>

                  <div>
                    <span className="text-sm font-bold">Name:</span>
                    <span className="text-sm font-bold text-gray-500">
                      {(
                        modalData?.firstName +
                        " " +
                        modalData?.lastName
                      ).toUpperCase()}
                    </span>
                    <br />
                    <span className="text-sm font-bold">Email:</span>
                    <span className="text-sm font-bold text-gray-500">
                      {modalData?.Email}
                    </span>
                    <br />
                    <span className="text-sm font-bold">No:of People:</span>
                    <span className="text-sm font-bold text-gray-500">
                      {modalData?.person}
                    </span>
                    <br />
                    <span className="text-sm font-bold">Payment Status:</span>
                    <span className="text-sm font-serif text-gray-500">
                      {modalData?.payment}
                    </span>
                    <br />
                  </div>
                  <div className="my-1 text-green-600">
                    Amount:{" "}
                    {modalData &&
                      (
                        modalData?.person * modalData?.packageId?.price
                      ).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  {/* <button data-modal-hide="staticModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="staticModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingDetailsComponent;

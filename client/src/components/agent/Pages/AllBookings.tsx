import React, { useEffect, useState } from "react";
import { agentGetAllBookings } from "../../../features/axios/api/agent/agentGetAllBooking";
import { GetAllBookingDetailsApiResponse } from "../../../API/type/getAllBookedData";
import { CircleLoader } from "react-spinners";
import { createAlertMsg } from "../../../features/axios/api/agent/agentCreateAlertMsg";
import { ToastContainer, toast } from "react-toastify";
import PageTitle from "../../common/Headings";
const AgentAllBookings: React.FC = () => {
  const [isLogin, setIsLoad] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const [bookedData, setBookedData] = useState<
    GetAllBookingDetailsApiResponse[] | null
  >(null);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  useEffect(() => {
    const getAllBookings = async () => {
      const result = await agentGetAllBookings();
      if (result) {
        setIsLoad(true);
        setBookedData(result);
      }
    };

    getAllBookings();
  }, []);

  const alertHandler = async (x: any) => {
    const obj = {
      userId: x.userId,
      packageName: x?.packageDetails.packageName,
      price: x?.person * x?.packageDetails?.price,
    };
    const result = await createAlertMsg(obj);
    if (result) {
      notify("informed!", "success");
    } else {
      notify("something went wrong!", "error");
    }
  };
  return !isLogin ? (
    <div className=" w-full flex justify-center  h-full ">
      <div className="py-52">
        <CircleLoader color="#1bacbf " />
      </div>
    </div>
  ) : (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
       <PageTitle title="All Bookings"/>
        <ToastContainer />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Package Name
                </th>
                <th scope="col" className="px-6 py-3">
                  user Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookedData && bookedData ? (
                bookedData
                  ?.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((x: GetAllBookingDetailsApiResponse) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {x?.packageDetails?.packageName}
                        </th>
                        <td className="px-6 py-4">{x?.Email}</td>
                        <td className="px-6 py-4">
                          {(
                            x?.person * x?.packageDetails?.price
                          ).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                        <td
                          className={
                            x?.payment === "pending"
                              ? "px-6 py-4 text-red-600"
                              : "px-6 py-4 text-green-400"
                          }
                        >
                          {x?.payment}
                        </td>
                        <td className="px-6 py-4">
                          {x?.payment === "pending" ? (
                            <button
                              className="font-medium  text-blue-600 dark:text-blue-500 hover:underline"
                              onClick={() => {
                                alertHandler(x);
                              }}
                            >
                              Inform
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <div> no data found</div>
              )}
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
                Math.ceil(bookedData?.length ?? 0 / itemsPerPage)
              }
              className="flex items-center justify-center px-3 h-8 ml-3 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentAllBookings;

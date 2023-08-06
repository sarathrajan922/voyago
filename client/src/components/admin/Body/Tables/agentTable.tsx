/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AgentDataApiResponse } from "../../../../API/type/getAllAgents";

import { getAgents } from "../../../../features/axios/api/admin/adminGetAllAgent";
import { BlockAgent } from "../../../../features/axios/api/admin/adminBlockAgent";

const AgentTable: React.FC = () => {
  const [agentData, SetAgentData] = useState<AgentDataApiResponse[] | null>(
    null
  );
  const [status, setStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  useEffect(() => {
    const getAgents = async () => {
      const data: any = await getAllAgents();
      SetAgentData(data?.agentData);
    };
    getAgents();
  }, [status]);

  const getAllAgents = async () => {
    const data = await getAgents().then((response) => {
      return response;
    });
    return data;
  };

  const changeStatus = async (agentId: string) => {
    await BlockAgent(agentId)
      .then((response) => {
        notify("Done!", "success");
        setStatus(!status);
      })
      .catch((error) => {
        notify(error.message, "error");
      });
  };
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                SL.NO
              </th>
              <th scope="col" className="px-6 py-3">
                Agent Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                verification status
              </th>

              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {agentData
              ?.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((x: any, index: any) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {x.firstName + " " + x.lastName}
                    </td>
                    <td className="px-6 py-4">{x.email}</td>
                    <td className="px-6 py-4">
                      {x.isVerified ? (
                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                          verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                          Not verified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">{x.mobile}</td>
                    <td className="px-6 py-4">
                      <Tooltip
                        content={
                          x.isActive ? "Block the Agent" : "Unblock the Agent"
                        }
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <Button
                          onClick={() => {
                            changeStatus(x._id);
                          }}
                          className={
                            x.isActive
                              ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                              : "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                          }
                        >
                          {x.isActive ? "Block" : "Unblock"}
                        </Button>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

    
      <div className="flex justify-center mt-10">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 mr-3 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
          {/* Previous button content */}
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(agentData?.length ?? 0 / itemsPerPage)
          }
        >
          Next
          {/* Next button content */}
        </button>
        <ToastContainer />
      </div>
    </>
  );
};

export default AgentTable;

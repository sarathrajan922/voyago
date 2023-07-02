/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import { UserDataApiResponse } from "../../../../API/type/getAllUser";
import axios from "axios";
import BASE_URL, { urls } from "../../../../config";
import { getUsers } from "../../../../features/axios/api/admin/adminGetAllUsers";

const UserTable: React.FC = () => {
  const [userData, SetUserData] = useState<UserDataApiResponse[] | null>(null);
  const [status, setStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    const getUsers = async () => {
      const data: any = await getAllUsers();
      SetUserData(data?.userData);
    };
    getUsers();
  }, [status]);

  const getAllUsers = async () => {

  const data =   await getUsers().then((response)=>{
      console.log(response)
      return response
    })
    return data
  };

  const changeStatus = async (userId: string) => {
    try {
      await axios.post(BASE_URL + urls.ADMIN_BLOCK_USER + userId);

      setStatus(!status);
    } catch (err) {
      console.error(err);
    }
  };

  const goToPreviousPage = ()=>{
    setCurrentPage((prevPage)=> prevPage -1)
  }

  const goToNextPage = ()=>{
    setCurrentPage((prevPage)=> prevPage + 1)
  }

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
                user Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {userData?.slice(
              (currentPage -1)* itemsPerPage, currentPage * itemsPerPage
            ).map((x: any, index: any) => {
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
                  <td className="px-6 py-4">{x.mobile}</td>
                  <td className="px-6 py-4">
                    <Tooltip
                      content={
                        x.isActive ? "Block the User" : "Unblock the user"
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

      {/* <!-- Previous Button --> */}
      <div className="flex justify-center mt-10">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
          {/* Previous button content */}
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(userData?.length ?? 0 / itemsPerPage)
          }
        >
          Next
          {/* Next button content */}
        </button>
      </div>
    </>
  );
};

export default UserTable;

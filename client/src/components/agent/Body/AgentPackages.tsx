import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetALLPackagesApiResponse } from "../../../API/type/getAllPackageAgent";
import BASE_URL, { urls } from "../../../config";

const AgentPackages: React.FC = () => {
  const [packages, SetAllPackages] = useState<GetALLPackagesApiResponse[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  console.log(packages);
  useEffect(() => {
    const callPackage = async () => {
      const data: any = await getAllPackages();
      SetAllPackages(data?.result);
    };
    callPackage();
  }, []);

  const getAllPackages = async () => {
    try{
       //! replace the agent id with logged agentId
    const response = await axios.get(BASE_URL + urls.AGENT_GET_ALL_PACKAGES + "64941a796b4f3bd48f57ecfa");
    return response.data;
    }catch(err){
      console.error(err)
    }
   
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              Tour Packages
            </p>
          </div>
        </div>

        {/* list of pakages */}

        <div className="grid lg:grid-cols-4 lg:gap-3 justify-items-center">
          {/* first card */}

          {/* loop this one */}

          {packages && packages.length ? packages?.slice(
              (currentPage -1)* itemsPerPage, currentPage * itemsPerPage
            ).map((x: any, index: any) => {
              return (
              <div className="py-5">
            <div className="rounded overflow-hidden shadow-lg max-h-[30rem]">
              <img
                src={x.images}
                className="w-full"
                alt="demo"
              />

              <div className="py-3 px-3">
                <div className="ms-2 text-lg font-semibold mb-2">
                  {x?.packageName}
                </div>
                <p className="ms-2 text-sm">
                  {x?.description}
                </p>
                <span className=" ms-2 text-xs font-bold ">
                  category:
                  <span className="text-gray-500 text-xs">{x?.category}</span>
                </span>
                <br />
                <span className=" ms-2 text-xs font-bold ">
                  locations:
                  <span className="text-gray-500 text-xs">{x?.locations}</span>
                </span>{" "}
                <br />
                <span className=" ms-2 text-xs font-bold ">
                  services:
                  <span className="text-gray-500 text-xs ">{x?.services}</span>
                </span>
                <div className="ms-2">
                  <span className="font-semibold">
                    starting from <span className="text-green-600">₹{x?.price}</span>
                  </span>
                </div>
              </div>
              <div className="grid grid-flow-col px-3 gap-3 pb-5 ">
                {/* <button
                  type="button"
                  className="px-3 py-2 text-xs font-medium text-center rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80"
                >
                  full Details
                </button> */}
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Full view</button>


                {/* <button
                  type="button"
                  className="px-3 py-2 text-xs font-medium text-center rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80"
                >
                  Disable
                </button> */}
                                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Disable</button>

                

              </div>
            </div>
          </div>
            )
          }) : <div><p>No packages available</p></div>}
          
          
        </div>

        {/* <!-- Previous Button --> */}
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={goToPreviousPage}
            disabled={currentPage ===1}
            className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
            {/* Previous button content */}
          </button>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={
              currentPage=== Math.ceil(packages?.length ?? 0 / itemsPerPage)
            }
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            {/* Next button content */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentPackages;

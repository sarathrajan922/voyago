import React, { useEffect, useState } from "react";
import { CategoryApiResponse } from "../../../API/type/getAllCategory";
import { GetALLPackagesApiResponse } from "../../../API/type/getAllPackageAgent";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Select, Option } from "@material-tailwind/react";
import { agentAllPackage } from "../../../features/axios/api/agent/agentAllPackage";
import { getAgentCategory } from "../../../features/axios/api/agent/agentGetAllCategory";
import { DisablePackage } from "../../../features/axios/api/agent/agentDisablePackage";
import { Link } from "react-router-dom";
import PageTitle from "../../common/Headings";
const AgentPackages: React.FC = () => {
  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const [noPackage, SetNopackage] = useState("");
  const [packages, SetAllPackages] = useState<
    GetALLPackagesApiResponse[] | null
  >(null);

  const [AllPackages, setAllPackages] = useState<
    GetALLPackagesApiResponse[] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [status, setStatus] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  useEffect(() => {
    const callPackage = async () => {
      const data: any = await getAllPackages();
      SetAllPackages(data?.result);
      setAllPackages(data?.result);
    };
    callPackage();
  }, []);

  useEffect(() => {
    const callPackage = async () => {
      const data: any = await getAllPackages();
      SetAllPackages(data?.result);
      setAllPackages(data?.result);
    };
    callPackage();
  }, [status]);

  const getAllPackages = async () => {
  
    return await agentAllPackage()
      .then((response) => {
        return response;
      })
      .catch((error: any) => {
        SetNopackage(error.message);
      });
  };
  const [agentCategory, setAgentCategory] = useState<
    CategoryApiResponse[] | ""
  >("");

  useEffect(() => {
    const Category = async () => {
      const data: any = await getCategory();
      setAgentCategory(data?.result);
    };
    Category();
  }, []);

  //todo change the search functionality into customHook
  const [searchTxt, SetsearchTxt] = useState("");

  const serarchData = (
    searchTxt: string,
    fullPackages: GetALLPackagesApiResponse[] | null
  ) => {
    const lowercaseSearchTxt = searchTxt.toLowerCase();
    return fullPackages?.filter((doc) =>
      doc?.packageName.toLowerCase().includes(lowercaseSearchTxt)
    );
  };

  //todo change the categroy wise search  into a customHook

  const searchWithCategory = (
    category: string,
    fullPackages: GetALLPackagesApiResponse[] | null
  ) => {
    return fullPackages?.filter((doc) => {
      return doc?.category === category;
    });
  };

  //todo change the filter with price into a customHook

  const filterWithPrice = (
    order: number,
    fullPackages: GetALLPackagesApiResponse[] | null
  ) => {
    let filteredData: any;
    switch (order) {
      case 1:
        filteredData = fullPackages?.filter((doc) => doc?.price < 10000);
        break;
      case 2:
        filteredData = fullPackages?.filter(
          (doc) => doc?.price >= 11000 && doc?.price <= 20000
        );
        break;
      case 3:
        filteredData = fullPackages?.filter(
          (doc) => doc?.price >= 20000 && doc?.price <= 30000
        );
        break;
      case 4:
        filteredData = fullPackages?.filter(
          (doc) => doc?.price >= 30000 && doc?.price <= 50000
        );
        break;
      case 5:
        filteredData = fullPackages?.filter((doc) => doc?.price > 50000);
        break;
      default:
        filteredData = fullPackages;
    }

    return filteredData;
  };

  const getCategory = async () => {
    return await getAgentCategory()
      .then((response) => {
        return response;
      })
      .catch((error: any) => {
        // notify(error.message,'error')
        console.log(error.message);
      });
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  //todo disable package

  const packageDisable = async (packageId: string) => {
    await DisablePackage(packageId)
      .then(() => {
        notify("Package disabled successfully", "success");
        setStatus(!status);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        <PageTitle title="Tour Package"/>
        <ToastContainer />
        <div className="grid lg:grid-cols-3  gap-4 mb-4">
          <div className="flex flex-col w-72 gap-6">
            <Select size="md" label="Select category " value={selectedCategory}>
              {/* //! all category is working but, there are some bugs */}
              <Option
                key={"allcategory"}
                onClick={() => {
                  setSelectedCategory("All");
                  const data = serarchData("", AllPackages);
                  SetAllPackages(data ?? null);
                }}
              >
                All
              </Option>
              {agentCategory &&
                agentCategory.map((x, index) => {
                  return (
                    <Option
                      onClick={() => {
                        setSelectedCategory(x.name);
                        const data = searchWithCategory(x?.name, AllPackages);
                        SetAllPackages(data ?? null);
                      }}
                    >
                      {x?.name}
                    </Option>
                  );
                })}
            </Select>
          </div>

          <div className="flex flex-col w-72 gap-6">
            <Select size="md" label="Filter">
              <Option
                onClick={() => {
                  const data = filterWithPrice(1, AllPackages);
                  SetAllPackages(data ?? null);
                }}
              >
                Below ₹10,000
              </Option>
              <Option
                onClick={() => {
                  const data = filterWithPrice(2, AllPackages);
                  SetAllPackages(data ?? null);
                }}
              >
                ₹11,000-₹20,000
              </Option>
              <Option
                onClick={() => {
                  const data = filterWithPrice(3, AllPackages);
                  SetAllPackages(data ?? null);
                }}
              >
                ₹21,000-₹30,000
              </Option>
              <Option
                onClick={() => {
                  const data = filterWithPrice(4, AllPackages);
                  SetAllPackages(data ?? null);
                }}
              >
                ₹31,000-₹50,000
              </Option>
              <Option
                onClick={() => {
                  const data = filterWithPrice(5, AllPackages);
                  SetAllPackages(data ?? null);
                }}
              >
                ₹51,000 Above
              </Option>
            </Select>
          </div>

          <div className="flex flex-col w-72 gap-6">
            <label
              htmlFor="default-search"
              className="mb-2 text-xs text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 pl-10 text-m  border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search.."
                value={searchTxt}
                onChange={(e) => {
                  SetsearchTxt(e.target.value);
                }}
                required
              />
              <button
                className="text-white absolute right-1 bottom-1  bg-blue-gray-600 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 mt-3 p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  const data = serarchData(searchTxt, AllPackages);
                  console.log(data);
                  SetAllPackages(data ?? null);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* list of pakages */}

        <div className="grid lg:grid-cols-3 lg:gap-3 justify-items-center">
          {/* first card */}

          {/* loop this one */}

          {packages && packages.length ? (
            packages
              ?.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((x: any, index: any) => {
                return (
                  <div className="py-5 max-h-[40rem]">
                    <div className="rounded overflow-hidden hover:shadow-lg ">
                      <img src={x.images} className="w-full" alt="demo" />

                      <div className="py-3 px-3">
                        <div className="ms-2 text-lg font-semibold mb-2">
                          {x?.packageName}
                        </div>
                        <p className="ms-2 text-sm">{x?.description}</p>
                        <span className=" ms-2 text-xs font-bold ">
                          category:
                          <span className="text-gray-500 text-xs">
                            {x?.category}
                          </span>
                        </span>
                        <br />
                        <span className=" ms-2 text-xs font-bold ">
                          locations:
                          <span className="text-gray-500 text-xs">
                            {x?.locations}
                          </span>
                        </span>{" "}
                        <br />
                        <span className=" ms-2 text-xs font-bold ">
                          services:
                          <span className="text-gray-500 text-xs ">
                            {x?.services}
                          </span>
                        </span>
                        <div className="ms-2">
                          <span className="font-semibold">
                            starting from{" "}
                            <span className="text-green-600">₹{x?.price}</span>
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-flow-col px-3 gap-3 pb-5 ">
                        <Link to={`/agent/edit-package/${x?._id}`}>
                          <button
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            Edit/Delete
                          </button>
                        </Link>

                        {x?.isDisabled ? (
                          <button
                            type="button"
                            className="text-white-900 bg-red-500 border border-gray-300 focus:outline-none hover:bg-red-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            Disabled
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              packageDisable(x?._id);
                            }}
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            Disable
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div>
              <p>{noPackage}</p>
            </div>
          )}
        </div>

        {/* <!-- Previous Button --> */}
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
            {/* Previous button content */}
          </button>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={
              currentPage === Math.ceil(packages?.length ?? 0 / itemsPerPage)
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

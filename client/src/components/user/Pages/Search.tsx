/* eslint-disable array-callback-return */
import { Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { userGetAllUniqueCategory } from "../../../features/axios/api/user/userGetAllUniueCategory";
import { GetALLPackagesApiResponse } from "../../../API/type/getAllPackageAgent";
import { userGetAllPackges } from "../../../features/axios/api/user/userGetAllPackages";
import { Link } from "react-router-dom";

const SearchComponent: React.FC = () => {
  const [isFilterSelect, setIsFilterSelect] = useState<number | null>(null);
  const [category, setCategory] = useState<string[] | null>(null);
  const [packages, SetPackages] = useState<GetALLPackagesApiResponse[] | null>(
    null
  );
  const [serachResult,setSearchResult]= useState<GetALLPackagesApiResponse[] | null>(
    null
  );
  const [fileterdResult ,setFilteredResult]= useState<GetALLPackagesApiResponse[] | null>(
    null
  );
  const [displayPackage, setDisplayPackage] = useState<
    GetALLPackagesApiResponse[] | null
  >(null);

  useEffect(() => {
    userGetAllUniqueCategory().then((response) => {
      setCategory(response);
    });
    userGetAllPackges()
      .then((response) => {
        SetPackages(response?.result);
        setDisplayPackage(response?.result);
      })
      .catch((error: any) => {
        console.error(error.message);
      });
  }, []);

  const filterWithPrice = (
    order: number,
    fullPackages: GetALLPackagesApiResponse[] | null
  ) => {
    if(serachResult){
      fullPackages = serachResult
    }
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
    setIsFilterSelect(order);
    setDisplayPackage(filteredData);
    setFilteredResult(filteredData);
  };

  const [searchTxt, SetsearchTxt] = useState("");
  const searchData = (
    searchTxt: string,
    fullPackages: GetALLPackagesApiResponse[] | null
  ) => {
    const lowercaseSearchTxt = searchTxt.toLowerCase();
    const data = fullPackages?.filter((doc) =>
      doc?.packageName.toLowerCase().includes(lowercaseSearchTxt)
    );
    setDisplayPackage(data ?? null);
    setSearchResult(data ?? null);
  };

  useEffect(() => {
    searchData(searchTxt, packages);
  }, [searchTxt]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const searchWithCategory = (category: string) => {
    let packages = displayPackage;
    if(fileterdResult){
      packages = fileterdResult
    }
    const data = packages?.filter((doc) => {
      return doc?.category === category;
    });
    setDisplayPackage(data ?? null);
  };

  useEffect(() => {
    searchWithCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (event: any) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "All") {
      if(fileterdResult){
        setDisplayPackage(fileterdResult)
      }else{
        setDisplayPackage(packages);
      }
      return;
    }
    setSelectedCategory(selectedCategory);
  };

  return (
    <section className="mt-10 dark:bg-gray-900">
      <div className=" px-4 mx-auto max-w-screen-xl lg:pt-0">
        <div className="flex flex-wrap h-[35rem]">
          <div className="lg:w-1/3 w-1/3">
            <div className="flex flex-col p-4 mt-5">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                  placeholder=" "
                  required
                  value={searchTxt}
                  onChange={(e) => {
                    SetsearchTxt(e.target.value);
                  }}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-focus:dark:text-blue -400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Search
                </label>
              </div>

              <div className="mt-2 flex flex-col gap-2 ">
                <span
                  onClick={() => {
                    filterWithPrice(1, packages);
                  }}
                  className={`text-sm font-medium hover:shadow-lg cursor-pointer mt-1 ${
                    isFilterSelect === 1 && "shadow-lg"
                  }`}
                >
                  Below ₹10,000
                </span>
                <span
                  onClick={() => {
                    filterWithPrice(2, packages);
                  }}
                  className={`text-sm font-medium hover:shadow-lg cursor-pointer mt-1 ${
                    isFilterSelect === 2 && "shadow-lg"
                  }`}
                >
                  ₹11,000-₹20,000
                </span>
                <span
                  onClick={() => {
                    filterWithPrice(3, packages);
                  }}
                  className={`text-sm font-medium hover:shadow-lg cursor-pointer mt-1 ${
                    isFilterSelect === 3 && "shadow-lg"
                  }`}
                >
                  {" "}
                  ₹21,000-₹30,000
                </span>
                <span
                  onClick={() => {
                    filterWithPrice(4, packages);
                  }}
                  className={`text-sm font-medium hover:shadow-lg cursor-pointer mt-1 ${
                    isFilterSelect === 4 && "shadow-lg"
                  }`}
                >
                  ₹31,000-₹50,000
                </span>
                <span
                  onClick={() => {
                    filterWithPrice(5, packages);
                  }}
                  className={`text-sm font-medium hover:shadow-lg cursor-pointer mt-1 ${
                    isFilterSelect === 5 && "shadow-lg"
                  }`}
                >
                  ₹51,000 Above
                </span>
              </div>
              <div className="mt-6 w-full ">
                <label htmlFor="underline_select" className="sr-only"></label>
                <select
                  onChange={handleCategoryChange}
                  id="underline_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option selected value={selectedCategory}>
                    Select Category
                  </option>
                  <option key={"all-category"} value={"All"}>
                    All
                  </option>
                  {category &&
                    packages &&
                    category.map((data: string, index: number) => (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 w-2/3 pl-2">
            {displayPackage && displayPackage.length ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center p-5 mt-10 h-[29rem] rounded-md overflow-y-scroll">
                {/* loop this div */}
                {displayPackage &&
                  displayPackage.map((doc: any, index: any) => (
                    <Link to={`package-details/${doc?._id}`}>
                      <div className="py-5 px-2 ">
                        <div
                          key={index}
                          className="rounded overflow-hidden  hover:shadow-xl"
                        >
                          <img src={doc.images} alt="" />
                          <div className="py-3 px-3 text-center flex justify-evenly">
                            <div className="text-sm">{doc.packageName}</div>
                            <div className="text-sm text-green-500">
                              {doc?.price?.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="p-5 mt-10 h-[29rem] text-red-400">No Package Available!</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchComponent;

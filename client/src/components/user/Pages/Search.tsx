/* eslint-disable array-callback-return */
import { Select, Option } from "@material-tailwind/react";
import { useState,useEffect } from "react";
import { userGetAllUniqueCategory } from "../../../features/axios/api/user/userGetAllUniueCategory";

const SearchComponent: React.FC = () => {
  const [isFilterSelect, setIsFilterSelect] = useState<number | null>(null);
  const [category,setCategory]= useState<string[] | null>(null);

  useEffect(()=>{
    userGetAllUniqueCategory().then((response)=>{
        setCategory(response)
    })
  },[])
  console.log(category)
  const FilterHandler = (index: number) => {
    setIsFilterSelect(index);
  };

  return (
    <section className="mt-5 dark:bg-gray-900">
      <div className=" px-4 mx-auto max-w-screen-xl lg:pt-0">
        <div className="flex flex-wrap   h-screen">
          <div className="lg:w-1/3 w-1/3 border-r">
            <div className="flex flex-col p-4 mt-5">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-focus:dark:text-blue -400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  search
                </label>
              </div>

              <div className="mt-2 flex flex-col gap-2 ">
                <span
                  onClick={() => {
                    FilterHandler(1);
                  }}
                  className={`text-sm font-medium hover:shadow-lg cursor-pointer mt-1 ${
                    isFilterSelect === 1 && "shadow-lg"
                  }`}
                >
                  Below ₹10,000
                </span>
                <span
                  onClick={() => {
                    FilterHandler(2);
                  }}
                  className={`text-sm font-medium hover:shadow-lg cursor-pointer mt-1 ${
                    isFilterSelect === 2 && "shadow-lg"
                  }`}
                >
                  ₹11,000-₹20,000
                </span>
                <span
                  onClick={() => {
                    FilterHandler(3);
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
                    FilterHandler(4);
                  }}
                  className={`text-sm font-medium hover:shadow-lg cursor-pointer mt-1 ${
                    isFilterSelect === 4 && "shadow-lg"
                  }`}
                >
                  ₹31,000-₹50,000
                </span>
                <span
                  onClick={() => {
                    FilterHandler(5);
                  }}
                  className={`text-sm font-medium hover:shadow-lg cursor-pointer mt-1 ${
                    isFilterSelect === 5 && "shadow-lg"
                  }`}
                >
                  ₹51,000 Above
                </span>
              </div>
              <div className="mt-6 w-full ">
                <label htmlFor="underline_select" className="sr-only">
                  
                </label>
                <select
                  id="underline_select"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option selected>Select Category</option>
                  {category && category.map((data:string,index:number)=><option key={index} value="US">{data}</option>)}
                  {/* <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option> */}
                </select>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 w-2/3 bg-gray-50">search results</div>
        </div>
      </div>
    </section>
  );
};

export default SearchComponent;

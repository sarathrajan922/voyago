/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const BookingDetailsComponent: React.FC = () => {








  return (
    <section className=" bg-white mt-0 dark:bg-gray-900">
      <div className=" px-4 mx-auto max-w-screen-xl bg-blue-gray-300 lg:pt-0">
        <div className=" flex flex-col  justify-center md:p-12 ">
          <div className="lg:w-[50rem] b min-h-[20rem] pb-16 mt-1 min-w-[25rem] lg:mb-16 px-10 lg:ms-16 lg:h-[20rem]">
            <h2 className="text-center text-gray-900  dark:text-white text-m md:text-xl font-extrabold mb-5">
              <span className="text-black-500">Booking Details</span>
            </h2>
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
                      <span className="sr-only">view</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {/* loop start */}
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">pending</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                 {/* loop end */}
                </tbody>
              </table>
            </div>
            <div className="justify-center mx-[35%] lg:mx-[40%]">
            <div className="flex mt-10">
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>

              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-3 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default BookingDetailsComponent;

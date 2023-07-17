import React, { useEffect, useState } from "react";
import { agentGetAllBookings } from "../../../features/axios/api/agent/agentGetAllBooking";

const AgentAllBookings: React.FC = () => {
  interface Result {
    _id: string;
    firstName: string;
    lastName: string;
    Email: string;
    travelDate: string;
    person: number;
    packageId: string;
    userId: string;
    payment: string;
    __v: number;
  }
  interface PackageDataInterface {
    _id: string;
    agentId: string;
    packageName: string;
    description: string;
    price: number;
    locations: string;
    category: string;
    isDisabled: boolean;
    images: string;
    duration: number;
    services: string;
    __v: number;
  }

  const [bookedData, setBookedData] = useState<Result[] | null>(null);
  const [packageData, setPackageData] = useState<PackageDataInterface[] | null>(
    null
  );

  console.log(bookedData);
  useEffect(() => {
    const getAllBookings = async () => {
      const result = await agentGetAllBookings();
      if (result) {
        const bookedData = result.bookedData;
        const packageData = result.packageData;
        console.log(bookedData);
        console.log(packageData);
        setBookedData(bookedData);
        setPackageData(packageData);
        // setBookedData(result);
      }
    };

    getAllBookings();
  }, []);
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              All Bookings
            </p>
          </div>
        </div>

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
              {bookedData && packageData ? (
                bookedData.map((x: Result, index) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {packageData[index].packageName}
                      </th>
                      <td className="px-6 py-4">{x?.Email}</td>
                      <td className="px-6 py-4">
                        {(x?.person * packageData[index]?.price).toLocaleString(
                          "en-IN",
                          {
                            style: "currency",
                            currency: "INR",
                          }
                        )}
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
                          <button className="font-medium  text-blue-600 dark:text-blue-500 hover:underline">
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
      </div>
    </div>
  );
};

export default AgentAllBookings;

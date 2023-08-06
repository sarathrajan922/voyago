import React, { useEffect, useState } from "react";
import { getAgentRevenue } from "../../../features/axios/api/agent/agentGetRevenue";
import { getUserCountAndBookingCount } from "../../../features/axios/api/agent/agentGetUserCountBookinCount";

const AgentDashBasicDetails: React.FC = () => {
  const [revenue, setRevenue] = useState<any>(null);
  const [bookingCount,setBookingCount]= useState<any>(null)
  const [userCount,setUserCount]= useState<any>(null)
  useEffect(() => {
    getAgentRevenue().then((res) => {
      setRevenue(res.agentRevenue);
    });

    getUserCountAndBookingCount().then((res)=>{
      console.log(res)
      setBookingCount(res?.bookingCount)
      setUserCount(res?.userCount)
    })
  }, []);
  return (
    <div className="flex flex-wrap mb-4">
      {/* total users */}
      <div className="md:w-1/2 lg:w-1/4 w-full p-2">
        <div className="shadow-md flex items-center justify-evenly h-16 rounded bg-gray-100 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-2xl text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>

          <p className="text-xl text-black  dark:text-gray-500">Total Users:{userCount}</p>
        </div>
      </div>
      {/* total booking */}
      <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <div className=" shadow-md flex items-center justify-evenly h-16 rounded bg-gray-100 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-2xl text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>

          <p className="text-xl text-black dark:text-gray-500">
            Total Bookings: {bookingCount}
          </p>
        </div>
      </div>

      {/* total revenue */}
      <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <div className="shadow-md flex items-center justify-evenly h-16 rounded bg-gray-100 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-2xl text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p className="text-xl text-black dark:text-gray-500">
            Total Revenue:{revenue?.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentDashBasicDetails;

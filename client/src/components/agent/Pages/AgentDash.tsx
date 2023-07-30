import React, { useEffect, useState } from "react";
import { agentVerificationCheck } from "../../../features/axios/api/agent/agentVerificationCheck";

const AgentDash: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const checkVerified = async () => {
      const result = await agentVerificationCheck();
      if (result?.result) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    };
    checkVerified();
  }, []);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4  mt-14">
          {!isVerified ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 mr-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Not Verified!</span> Your
                verification is under process.
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center justify-around h-16 rounded bg-gray-50 dark:bg-gray-800">
                  <p className="text-2xl font-bold text-black dark:text-gray-500">
                    Agent DashBoard
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {/* total users */}
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

                  <p className="text-xl text-black  dark:text-gray-500">
                    Total Users
                  </p>
                </div>

               

                {/* total booking */}
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
                    Total Bookings
                  </p>
                </div>

                {/* total revenue */}
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
                    Total Revenue
                  </p>
                </div>
              </div>
              <div className="grid grid-col-2 my-7">
                {/* here user chart component */}

                <div className="flex">
                  <div className="mr-10">
                    <div>
                      <h1>Bookings</h1>
                    </div>

                    {/* <SalesChart /> */}
                  </div>
                  <div className="ms-10 ">
                    <div>
                      <h1>Users</h1>
                    </div>
                    {/* <UserChart /> */}
                  </div>
                </div>
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentDash;

import React, { useEffect, useState } from "react";
import { agentVerificationCheck } from "../../../features/axios/api/agent/agentVerificationCheck";
import AgentDashBoardHeading from "../agentComponents/AgentDashBoardHeading";
import AgentDashBasicDetails from "../agentComponents/AgentDashBasicDetails";

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
            <AgentDashBoardHeading/>
              <AgentDashBasicDetails/>
              


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

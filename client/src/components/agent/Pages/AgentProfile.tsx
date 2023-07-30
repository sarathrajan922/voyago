import React, { useEffect, useState } from "react";
import { getAgentProfile } from "../../../features/axios/api/agent/agentGetProfile";
import { CircleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

interface Result {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  idProof_img: string;
  __v: number;
}
const AgentProfile: React.FC = () => {
    const navigate = useNavigate()
  const [agentData, setAgentData] = useState<Result | null>(null);
 console.log(agentData)
  useEffect(() => {
    const getAgent = async () => {
      const data = await getAgentProfile();
      if (data) {
    
        setAgentData(data);
      } else {
        console.log("data not found");
      }
    };
    getAgent();
  }, []);

  const editAgent=()=>{
    navigate('/agent/agent-profile-edit')
  }

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        {/* <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              Agent Profile
            </p>
          </div>
        </div> */}

        {agentData && agentData ? (
          <>
            <div className="grid lg:grid-cols-1 justify-items-center ">
              <div className="py-5 px-2 w-full flex max-h-[15rem]">
                <div className="pb-3 text-start w-[13rem] lg:max-w-[8rem]  text-m lg:h-[8rem]   font-semibold text-gray-900 dark:text-white">
                  <img
                    className="object-cover w-full "
                    src="https://res.cloudinary.com/dk4darniv/image/upload/v1689060759/image_apjubc.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col pb-3  ms-10 text-start  font-semibold text-gray-900 dark:text-white">
                  <h1 className="font-extrabold font-sans text-3xl">
                    {(
                      agentData?.firstName +
                      " " +
                      agentData?.lastName
                    ).toUpperCase()}
                  </h1>
                  <p className="text-xs py-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam, assumenda.
                    <br />
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-1 justify-items-center pt-5  ">
              <div className="pt-5 px-2 w-full  flex max-h-[15rem] hover:shadow">
                <div className="pb-3 text-start w-full lg:max-w-[25rem]  text-m    font-semibold text-gray-900 dark:text-white">
                  <div className="w-full h-[3rem]  py-5 my-2">
                    email:
                    <span className="px-5 text-xl font-serif ">
                      {agentData?.email}
                    </span>
                  </div>
                  <div className="w-full h-[3rem]  py-5 my-2">
                    mobile:
                    <span className="px-5 text-xl font-serif">
                      {agentData?.mobile}
                    </span>
                  </div>

                  <div className="w-full h-[3rem]  py-5 my-2">
                    verification :
                    {agentData?.isVerified ? (
                      <span className="px-5 text-m text-green-500 ">
                        verified
                      </span>
                    ) : (
                      <span className="px-5 text-m text-red-500 ">
                        NOT verified!, your verification under process!
                      </span>
                    )}
                  </div>
                  <div className="w-full h-[3rem]  py-5 my-2">
                    status:
                    <span className="px-5 text-m text-green-500 ">Active</span>
                  </div>
                  

                </div>
              </div>
            </div>

            <div className="inline-flex py-5 shadow-sm" role="group">
              <button
                type="button"
                  onClick={editAgent}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                edit
              </button>
            </div>
          </>
        ) : (
        <div className=" w-full flex justify-center  h-full ">
            <div className="py-52">
            <CircleLoader color="#1bacbf" />    
            </div>
            
        </div>
          
        )}
      </div>
    </div>
  );
};

export default AgentProfile;

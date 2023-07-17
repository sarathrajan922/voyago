import React from "react";

const AgentProfile: React.FC = ()=>{


    



    return (
        <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              Agent Profile
            </p>
          </div>
        </div>


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
                    SARATH RAJAN
                   
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
                    sarathagent@gmail.com
                  </span>
                </div>
                <div className="w-full h-[3rem]  py-5 my-2">
                  mobile:
                  <span className="px-5 text-xl font-serif">
                    8768698
                  </span>
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
            //   onClick={editUser}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              edit
            </button>

            {/* <button
              type="button"
              className="px-4 ms-5 py-2 text-xs rounded text-white font-medium bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
            >
              Delete Account
            </button> */}
          </div>

        </div>
    </div>
    )
}

export default AgentProfile;
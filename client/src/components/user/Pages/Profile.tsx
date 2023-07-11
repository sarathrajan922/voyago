import React from "react";

const UserProfile: React.FC = () => {


    
  return (
    <section className="bg-white mt-0 dark:bg-gray-900">
      <div className="pt-8 px-4 mx-auto max-w-screen-xl lg:pt-16">
        <div className=" flex flex-col justify-evenly md:p-12 ">
          {/* <h4 className="text-center text-gray-900 dark:text-white text-2xl md:text-2xl font-extrabold mb-2">
            userProfile
          </h4> */}

          <div>
            <img
              className="w-full max-h-[20rem] mt-0 overflow-hidden object-cover"
            //   src="https://images.unsplash.com/photo-1605701877331-645ad05dcb97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
            src="https://res.cloudinary.com/dk4darniv/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1689050866/samples/360_F_119670247_HDccziQUuo2kFpaN_sczmrj.png"
            alt=""
            />
          </div>

          <div className="grid lg:grid-cols-1 justify-items-center ">
            <div className="py-5 px-2 w-full  h-[30rem] max-h-[45rem]">
              <div className="rounded overflow-hidden  hover:shadow-lg mt-6 ">
                {/* <div className="py-3 px-3 text-start flex text-lg h-[25rem]  font-semibold text-gray-900 dark:text-white">
                  Profile Details
                  
                </div> */}
                <div className="grid lg:grid-cols-2 justify-items-center ">
              {/* loop this div */}
              {/* <div className="py-5 px-2 max-h-[40rem]">
                <div className="rounded overflow-hidden hover:shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1602828889956-45ec6cee6758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
                    alt=""
                  />
                  <div className="py-3 px-3 text-center">Heading 1</div>
                </div>
              </div>

              <div className="py-5 px-2 max-h-[40rem]">
                <div className="rounded overflow-hidden hover:shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1560625693-36619f571dca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1330&q=80"
                    alt=""
                  />
                  <div className="py-3 px-3 text-center">Heading 2</div>
                </div>
              </div> */}

              
            </div>
              </div>
            </div>
            {/* <div className="py-5 px-2 w-full bg-brown-500 max-h-[45rem]">
              <div className="rounded  hover:shadow-lg mt-6 px-5">
                <div className="py-3 px-3 text-center font-semibold">
                  Booking Form
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

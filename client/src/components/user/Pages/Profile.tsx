import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../../features/axios/api/user/userGetProfile";
import { UserDataApiResponse } from "../../../API/type/getUserData";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataApiResponse | null>(null);
  useEffect(() => {
    const getUserData = async () => {
      await getUserDetails()
        .then((response) => {
          setUserData(response.userData);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    };
    getUserData();
  }, []);



  const editUser = () => {
    navigate("/user-profile-edit");
  };
  const editPassword = ()=>{
    navigate('/user-edit-password')
  }

  return (
    <section className=" bg-white mt-0 dark:bg-gray-900">
      <div className=" px-4 mx-auto max-w-screen-xl lg:pt-0">
        <div className=" flex flex-col justify-evenly md:p-12 ">
        
            <div className="grid lg:grid-cols-1 justify-items-center ">
              <div className="py-5 px-2 w-full flex max-h-[15rem]">
                <div className="pb-3 text-start w-[13rem] lg:max-w-[8rem]  text-m lg:h-[8rem]  font-semibold text-gray-900 dark:text-white">
                  <img
                    className="object-cover w-full "
                    src="https://res.cloudinary.com/dk4darniv/image/upload/v1689060759/image_apjubc.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col pb-3  ms-10 text-start  font-semibold text-gray-900 dark:text-white">
                  <h1 className="font-extrabold font-sans text-3xl">
                    {/* SARATH RAJAN */}
                    {(userData?.firstName + " " + userData?.lastName).toUpperCase()}
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

          {/* email , mobile, status  */}
          <div className="grid lg:grid-cols-1 justify-items-center pt-5  ">
            <div className="pt-5 px-2 w-full  flex max-h-[15rem]">
              <div className="pb-3 text-start w-full lg:max-w-[25rem]  text-m    font-semibold text-gray-900 dark:text-white">
                <div className="w-full h-[3rem]  py-5 my-2">
                  email:
                  <span className="px-5 text-xl font-serif ">
                    {userData?.email}
                  </span>
                </div>
                <div className="w-full h-[3rem]  py-5 my-2">
                  mobile:
                  <span className="px-5 text-xl font-serif">
                    {userData?.mobile}
                  </span>
                </div>
                <div className="w-full h-[3rem]  py-5 my-2">
                  status:
                  <span className="px-5 text-m text-green-500 ">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* edit,delete button */}

          <div className="inline-flex py-5 shadow-sm" role="group">
            <button
              type="button"
              onClick={editUser}
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Edit Profile
            </button>

            <button
              type="button"
              onClick={editPassword}
              className="px-4 py-2 text-sm ms-2 font-medium text-gray-900 bg-transparent border border-gray-900 rounded hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              Edit Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

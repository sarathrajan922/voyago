import React, { useEffect, useState } from "react";
import ComunityCreateModal from "../Modals/CommunityCreateModal";

const Community: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  console.log(selectedChat);
  const chatHandler = (group: number) => {
    console.log("cliked");

    setSelectedChat(group);
  };
  useEffect(() => {}, [selectedChat]);
  return (
    <section className=" bg-white my-20 dark:bg-gray-900">
      {isModalOpen ? (
        <ComunityCreateModal setModal={() => setIsModalOpen(false)} />
      ) : (
        ""
      )}
      <div className=" px-4 mx-auto max-w-screen-xl lg:pt-0">
        <div className="flex h-[40rem]">
          <div className="bg-white w-1/3 ">
            <div className="text-blue-500 font-bold flex gap-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
              </svg>
              voyago chat
            </div>

            <div className="flex items-center rounded mx-2 mr-6 lg:px-5 px-1  h-[3rem] py-5 my-5 bg-blue-400">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="text-center  w-full"
              >
                Create Community
              </button>
            </div>

            {/* group1 */}
            <div className="overflow-y-scroll h-[32rem]">
              <div
                onClick={() => chatHandler(1)}
                className={
                  `border-b pl-4 border-gray-100 py-2 mr-2 flex items-center gap-2 cursor-pointer  rounded ` +
                  (selectedChat === 1 ? "bg-light-blue-50" : "")
                }
              >
                <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center ">
                  <div className="w-full text-center opacity-50 font-bold">
                    G
                  </div>
                </div>
                <span className="text-gray-800">group 1</span>
              </div>
              {/* group 2 */}
              <div
                onClick={() => chatHandler(2)}
                className={
                  `border-b pl-4 border-gray-100 py-2 mr-2 flex items-center gap-2 rounded  cursor-pointer ` +
                  (selectedChat === 2 ? "bg-light-blue-50" : "")
                }
              >
                <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center">
                  <div className="w-full text-center opacity-50 font-bold">
                    G
                  </div>
                </div>
                <span className="text-gray-800">group 2</span>
              </div>
              {/* group 3 */}
              <div
                onClick={() => chatHandler(3)}
                className={
                  `border-b pl-4 border-gray-100 mr-2 py-2 flex items-center gap-2 cursor-pointer  rounded ` +
                  (selectedChat === 3 ? "bg-light-blue-50" : "")
                }
              >
                <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center">
                  <div className="w-full text-center opacity-50 font-bold">
                    G
                  </div>
                </div>
                <span className="text-gray-800">group 3</span>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded w-2/3 p-2 flex flex-col">
            <div className="w-full h-[5rem] flex gap-4 bg-blue-100">
              <div className="w-10 h-10 mt-3 ms-3 bg-teal-400 rounded-full flex items-center ">
                <div className="w-full text-center opacity-50 font-bold">G</div>
              </div>
              <span className="text-gray-800 mt-4 font-bold">group 1</span>
            </div>
            <div className="flex-grow h-[35rem] overflow-y-scroll my-1">
              messages
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="text your message"
                className="bg-white border p-2 flex-grow rounded-sm"
                name=""
                id=""
              />
              <button className="bg-blue-500 text-white p-2 rounded-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;

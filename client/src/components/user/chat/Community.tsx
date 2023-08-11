import React, { useEffect, useRef, useState } from "react";
import ComunityCreateModal from "../Modals/CommunityCreateModal";
import { GetAllCommunityApiResponse } from "../../../API/type/getAllCommunity";
import { GetAllCommunity } from "../../../features/axios/api/user/userGetAllCommunity";
import CommunityGroupShimmer from "../../Shimmer/communityGroupShimmer";
import Navbar from "../Navbar/Navbar";
import { userJoinCommunity } from "../../../features/axios/api/user/userJoinCommunity";
import { GetAllConversationApiResponse } from "../../../API/type/getAllConversation";
import { getAllConversation } from "../../../features/axios/api/user/userGetAllConversation";
import { format } from "timeago.js";
import { userCreateConversation } from "../../../features/axios/api/user/userCreateConversation";
import { io } from "socket.io-client";
import { getUserDetails } from "../../../features/axios/api/user/userGetProfile";
import { SOCKET_URL } from "../../../config";


const Community: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [communityIds, setCommunitIds] = useState<string | null>(null);
  const [socketCommunityId, setSocketCommunityId] = useState<string | null>(
    null
  );
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUserDetails().then((response:any) => {
      setUserId(response.userData._id);
    });
  }, []);

  const socket = useRef<any>(null);

  const [joinedCommunity, setJoinedCommunity] = useState<
    GetAllCommunityApiResponse[] | null
  >(null);
  const [notJoinedCommunity, setNotJoinedCommunity] = useState<
    GetAllCommunityApiResponse[] | null
  >(null);
  const [status, setStatus] = useState<boolean>(true);
  const [chatHead, setChatHead] = useState<GetAllCommunityApiResponse | null>(
    null
  );
  const divRef = useRef<HTMLDivElement>(null);
  const [conversation, setConversation] = useState<
    GetAllConversationApiResponse[] | null
  >(null);

  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const getAllCommunity = async () => {
      GetAllCommunity()
        .then((response) => {
          //   setCommunities(response?.result.reverse());
          setJoinedCommunity(response?.result.joinedCommunities.reverse());
          setNotJoinedCommunity(
            response?.result.notJoinedCommunities.reverse()
          );
          // setUserId(response?.userId);
        })
        .catch((error: any) => {
          console.log(error.message);
        });
    };
    getAllCommunity();
  }, [status]);

  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [arraivalMsg, setArravialMsg] = useState<any>(null);

  const chatHandler = (group: number, doc: GetAllCommunityApiResponse) => {
    setSelectedChat(group);
    setChatHead(doc);
    setCommunitIds(doc?._id);
    getAllConversation(doc?._id)
      .then((response) => {
        setConversation(response);
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  };

  useEffect(() => {}, [selectedChat]);

  const communityJoinHandler = (communityId: string) => {
    userJoinCommunity(communityId)
      .then((response) => {
        // console.log(response);
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  };

  const messageHandler = (e: any) => {
    e.preventDefault();
    const communityId = chatHead?._id ?? "";
    const conversationObj = {
      communityId,
      message,
    };

    socket.current?.emit("sendMessage", { userId, communityIds, message });

    userCreateConversation(conversationObj)
      .then(() => {
        getAllConversation(communityId)
          .then((response) => {
            setConversation(response);
            setMessage("");
          })
          .catch((err: any) => {
            console.log(err.message);
          });
        setStatus(!status);
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    // scrollDiv();

    socket?.current?.on("getMessage", (data: any) => {
      setSocketCommunityId(data.communityId);
      const obj = {
        _id: "",
        communityId: "",
        message: data.message,
        createdAt: Date.now(),
        senderId: data.senderId,
      };

      setArravialMsg(obj);
    });
  }, [message]);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, arraivalMsg]);

  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    socket.current = io(SOCKET_URL);
    // socket.current = io('wss://voyago.site/socket/');
    
  }, []);

  useEffect(() => {
    if (userId) {
      socket?.current?.emit("addUser", userId);
      socket?.current?.on("getUsers", (users: any) => {
        console.log(users);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (communityIds === socketCommunityId) {
      arraivalMsg && setConversation((prev: any) => [...prev, arraivalMsg]);
    }
  }, [arraivalMsg]);

  return (
    <>
      <Navbar />
      <section className=" bg-white mb-20 mt-10 fixed w-full dark:bg-gray-900">
        {isModalOpen ? (
          <ComunityCreateModal
            setStatus={() => setStatus(!status)}
            setModal={() => setIsModalOpen(false)}
          />
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

              {/* joined group */}
              <div className="overflow-y-scroll h-[15rem]">
                {joinedCommunity && joinedCommunity ? (
                  joinedCommunity.map((doc, index) => {
                    return (
                      <div
                        onClick={() => chatHandler(index, doc)}
                        className={
                          `border-b pl-4 border-gray-100 py-2 mr-2 flex items-center gap-2 cursor-pointer  rounded ` +
                          (selectedChat === index ? "bg-light-blue-50" : "")
                        }
                      >
                        <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center ">
                          <div className="w-full text-center opacity-50 font-bold">
                            {doc?.communityName[0].toUpperCase()}
                          </div>
                        </div>

                        <span className="text-gray-800 line-clamp-1">
                          {doc?.communityName}
                        </span>
                        {doc?.admin === userId ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-green-500 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill="currentColor"
                                d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                              />
                              <path
                                fill="#fff"
                                d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                              />
                            </svg>
                            <span className="sr-only">Admin</span>
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
                ) : (
                  <CommunityGroupShimmer />
                )}
              </div>

              <div className=" flex items-center mx-2 my-2 px-1 rounded h-[3rem] mr-6 text-bold   ">
                other communities
              </div>

              {/* not joined */}
              <div className="overflow-y-scroll h-[15rem]">
                {notJoinedCommunity && notJoinedCommunity ? (
                  notJoinedCommunity.map((doc, index) => {
                    return (
                      <div
                        className={`border-b pl-4 border-gray-100 py-2 mr-2 flex items-center  gap-2   rounded `}
                      >
                        <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center ">
                          <div className="w-full text-center opacity-50 font-bold">
                            {doc?.communityName[0].toUpperCase()}
                          </div>
                        </div>
                        <span className="text-gray-800 line-clamp-1">
                          {doc?.communityName}
                        </span>
                        <div className="flex-grow"></div>
                        <div className="self-end  cursor-pointer ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 items-end hover:text-teal-400"
                            onClick={() => {
                              communityJoinHandler(doc?._id);
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <CommunityGroupShimmer />
                )}
              </div>
            </div>
            <div className="bg-green-50 rounded w-2/3 p-2 flex flex-col">
              {/* chat heading section */}
              {chatHead && chatHead ? (
                <div className="w-full h-[5rem] flex gap-4 bg-blue-100">
                  <div className="w-10 h-10 mt-3 ms-3 bg-teal-400 rounded-full flex items-center ">
                    <div className="w-full text-center opacity-50 font-bold">
                      {chatHead?.communityName[0].toUpperCase()}
                    </div>
                  </div>
                  <span className="text-gray-800 mt-4 font-bold">
                    {chatHead?.communityName}
                  </span>
                </div>
              ) : (
                <div className="flex-grow  bg-white"></div>
              )}

              {chatHead && (
                <>
                  <div className="flex-grow h-[35rem] overflow-y-scroll my-1">
                    {conversation && conversation.length !== 0 ? (
                      conversation.map((doc, index) => (
                        <div
                          key={index}
                          className={`flex flex-col mt-3 ${
                            doc?.senderId === userId ? "items-end" : ""
                          }`}
                        >
                          <div ref={divRef} className="flex">
                            <img
                              className="mr-2 w-8 mt-2 h-8 rounded-full object-cover"
                              src="https://res.cloudinary.com/dk4darniv/image/upload/v1690396460/png-transparent-circle-silhouett_pfuxe9.webp"
                              alt=""
                            />
                            <p
                              className={`p-3 rounded-2xl max-w-xs font-serif ${
                                doc?.senderId === userId
                                  ? "bg-teal-400 text-black"
                                  : "bg-white text-black"
                              }`}
                            >
                              <div>{doc?.message}</div>
                            </p>
                          </div>

                          <div className="text-xs mt-2">
                            {format(doc?.createdAt)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-xl mt-[30%] font-serif">
                        No message!
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="text your message"
                      className="bg-white border p-2 flex-grow rounded-sm"
                      name=""
                      id=""
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    <button
                      onClick={messageHandler}
                      className="bg-blue-500 text-white p-2 rounded-sm"
                    >
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Community;

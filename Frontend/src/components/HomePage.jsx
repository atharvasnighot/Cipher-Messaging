import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import ChatCard from "./ChatCard/ChatCard";
import { useState } from "react";

const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const handleClickOnChatCard = () => {
    setCurrentChat(true);
  };
  const handleSearch = () => {};
  return (
    <div className="relative">
      <div className=" w-full py-14 bg-[#4ca3eb] "></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-6 left-6 w-full  rounded-lg">
        <div className="left w-[30%] bg-[#e8e9ec] h-full rounded-lg">
          <div className="w-full rounded-lg">
            <div className="flex justify-between items-center p-3 rounded-lg">
              <div className="flex items-center space-x-3 ">
                <img
                  className="rounded-full w-10 h-10 cursor-pointer px-1 py-1"
                  src="luffy.jpeg"
                  alt=""
                />
                <p>username</p>
              </div>
              <div className="space-x-3 text-2xl flex">
                <TbCircleDashed />
                <BiCommentDetail />
              </div>
            </div>

            <div className="relative flex justify-center items-center bg-white py-4 px-3">
              <input
                className="border-none outline-none bg-slate-200 rounded-md  w-[93%] pl-9 py-2"
                type="text"
                placeholder="Search or Start new Chat"
                onChange={(e) => {
                  setQuerys(e.target.value);
                  handleSearch(e.target.value);
                }}
                value={querys}
              />
              <AiOutlineSearch className="left-5 top top-7 absolute" />
              <div>
                <BsFilter className="ml-4 text-3xl" />
              </div>
            </div>
            {/* {All user} */}
            <div className="bg-white overflow-y-scroll h-[76.8vh] px-3">
              {querys &&
                [1, 1, 1, 1].map((item) => (
                  <div onClick={handleClickOnChatCard}>
                    {" "}
                    <hr />
                    <ChatCard />{" "}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* deafault whatsapp page */}
        {!currentChat && (
          <div className="w-[50%] flex flex-col items-center justify-center h-full mx-20">
            <div className="max-w-[50%] text-center ">
              <img className="opacity-70" src="cipher.png" alt="" />
              <h1 className="text-4xl text-gray-600">Cipher Messaging</h1>
              <p className="my-9">Send and recieve messages </p>
            </div>
          </div>
        )}

        {/* Message part */}
        {currentChat && (
          <div>
            <div>
              <div>
                <div>
                  <img className="w-10 h-10 rounded-full" src="nigga.png" alt="" />
                  <p>username</p>
                </div>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

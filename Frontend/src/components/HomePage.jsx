import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";

import ChatCard from "./ChatCard/ChatCard";
import { useState } from "react";
import MessageCard from "./MessageCard/MessageCard";
import "./HomePage.css";

const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");

  const handleClickOnChatCard = () => {
    setCurrentChat(true);
  };

  const handleCreateNewMessage = () => {};
  const handleSearch = () => {};
  return (
    <div className="relative">
      <div className=" w-full py-14 bg-[#4ca3eb] "></div>
      <div className="flex bg-[#f0f2f5] h-[93vh] absolute top-[5vh] w-[98vw] left-[1vw] rounded-lg">
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
            <div className="bg-white overflow-y-scroll h-[72vh] px-3">
              {querys &&
                [1, 1, 1, 1].map((item) => (
                  <div onClick={handleClickOnChatCard}>
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
          <div className="w-[70%] relative">
            <div className="header absolute top-0 w-full bg-[#f0f2f5] ">
              <div className="flex justify-between  ">
                <div className="py-3 space-x-4 flex items-center px-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="nigga.png"
                    alt=""
                  />
                  <p>username</p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            {/* message section */}
            <div className="px-10 h-[85vh] overflow-y-scroll bg-slate-400">
              <div className="space-y-1 flex flex-col justify-center border mt-20 py-2">
                {/* {[1,1,1,1].map((item,i) => <MessageCard isReqUserMessage={i%2===0} content={"hey"} />)} */}
              </div>
            </div>
            {/* Footer Part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />

                <input
                  type="text"
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type Message"
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key == "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />

                <BsMicFill />

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

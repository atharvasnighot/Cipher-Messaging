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

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./HomePage.css";
<<<<<<< HEAD
import ChatCard from "./../ChatCard/ChatCard";
import MessageCard from "./../MessageCard/MessageCard";
import Profile from "./../Profile/Profile";
import CreateGroup from "../Group/CreateGroup";
=======
import ChatCard from './../ChatCard/ChatCard';
import MessageCard from './../MessageCard/MessageCard';
import Profile from './../Profile/Profile';
>>>>>>> parent of 32fc121 (Added MUI and CreateGroup component)

const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setProfile] = useState(false);
  const navigate = useNavigate();
  const [isGroup, setIsGroup] = useState(false);

  const handleClickOnChatCard = () => {
    setCurrentChat(true);
  };

  const handleNavigate = () => {
    // navigate("/profile")
    setProfile(true);
  };
  const handleCreateNewMessage = () => {};
<<<<<<< HEAD
  const handleCreateGroup = () => {
    setIsGroup(true);
  };
=======
>>>>>>> parent of 32fc121 (Added MUI and CreateGroup component)

  const handleCloseOpenProfile = () => {
    setProfile(false);
  };

  const handleSearch = () => {};
  return (
    <div className="relative ">
      <div className=" w-full py-14 bg-[#4ca3eb] "></div>
      <div className="flex bg-[#f0f2f5] h-[93vh] absolute top-[4vh] w-[98vw] left-[1vw] rounded-lg">
        <div className="left w-[30%] bg-white h-full rounded-lg">
          {/* profile */}
          {isGroup && <CreateGroup />}
          {isProfile && (
            <div className="w-full h-full">
              {" "}
              <Profile handleCloseOpenProfile={handleCloseOpenProfile}/>
            </div>
          )}

          {!isProfile && !isGroup && (
            <div className="w-full rounded-lg bg-[#ced2d8]">
            
              {/* home */}
              <div className="flex justify-between items-center p-3 rounded-lg">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3 "
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer px-1 py-1"
                    src="luffy.jpeg"
                    alt=""
                  />
                  <p>username</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail />
<<<<<<< HEAD
                  <div>
                    <BsThreeDotsVertical
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleCreateGroup}>
                        Create Group
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </div>
=======
>>>>>>> parent of 32fc121 (Added MUI and CreateGroup component)
                </div>
              </div>

              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="outline-none bg-slate-200 rounded-md border-b-2 border-white focus:border-blue-700 w-[93%] pl-9 py-2"
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
              <div className="bg-white px-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                {querys &&
                  [1, 1, 1, 1].map((item) => (
                    <div onClick={handleClickOnChatCard}>
                      <hr /><ChatCard/>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* deafault whatsapp page */}
        {!currentChat && (
          <div className="max-w-max flex flex-col items-center justify-center h-full mx-20 ">
            <div className=" max-w-[50%] text-center">
              <img className="opacity-70 mx-auto " src="cipher.png" alt="" />
              <h1 className="text-4xl text-gray-800 ">Cipher Messaging</h1>
              <p className="my-9 text-xl">Send and recieve messages </p>
            </div>
          </div>
        )}

        {/* Message part */}
        {currentChat && (
          <div className="w-[70%] relative ">
            <div className="header absolute top-0 w-full bg-[#f0f2f5] rounded-lg">
              <div className="flex justify-between rounded-lg ">
                <div className="py-3 space-x-4 flex items-center px-3 ">
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
            <div className="px-10 h-[85vh] overflow-y-auto bg-slate-100 rounded-lg">
              <div className="space-y-1 flex flex-col justify-center border mt-20 py-2">
                {[1, 1, 1, 1, 1, 1].map((item, i) => (
                  <MessageCard
                    isReqUserMessage={i % 2 === 0}
                    content={"message"}
                  />
                ))}
              </div>
            </div>
            {/* Footer Part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl rounded-lg ">
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

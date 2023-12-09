import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";
import ChatCard from "./../ChatCard/ChatCard";
import MessageCard from "./../MessageCard/MessageCard";
import Profile from "./../Profile/Profile";
import CreateGroup from "../Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction } from "../../Redux/Auth/Action";
import Particles from "./Particles";

const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setProfile] = useState(false);
  const navigate = useNavigate();
  const [isGroup, setIsGroup] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  const handleClickOnChatCard = () => {
    setCurrentChat(true);
  };

  const handleNavigate = () => {
    // navigate("/profile")
    setProfile(true);
  };
  const handleCreateNewMessage = () => {};
  const handleCreateGroup = () => {
    setIsGroup(true);
  };

  const handleCloseOpenProfile = () => {
    setProfile(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  //dimak kharab...................
  
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/signin");
  };

  useEffect(() => {
    dispatch(currentUser(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signin");
    }
  }, [auth.reqUser, navigate]);

  const handleSearch = () => {};
  return (
    <div className="relative ">
      <div className=" w-full py-14 bg-[#232424] "></div>
      <div className="flex bg-[#131313] h-[93vh] absolute top-[4vh] w-[98vw] left-[1vw] rounded-lg">
        <div className="left w-[30%] bg-[#131313] h-full rounded-lg">
          {/* profile */}
          {isGroup && <CreateGroup />}
          {isProfile && (
            <div className="w-full h-full">
              {" "}
              <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
            </div>
          )}

          {!isProfile && !isGroup && (
            <div className="w-full rounded-lg bg-[#131313] text-white">
              {/* home */}
              <div className="flex justify-between items-center p-3 rounded-lg ">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3 "
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer px-1 py-1"
                    src="luffy.jpeg"
                    alt=""
                  />
                  <p>{auth.reqUser?.fullName}</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail />
                  <div>
                    <BsThreeDotsVertical
                      id="fade-button"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />

                    <Menu
                      id="fade-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                      PaperProps={{
                        style: {
                          backgroundColor: "#333",
                        },
                      }}
                    >
                      <MenuItem
                        onClick={handleNavigate}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#555",
                          },
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={handleCreateGroup}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#555",
                          },
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Create Group
                      </MenuItem>
                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#555",
                          },
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center items-center bg-[#131313] py-4 px-3">
                <input
                  className="outline-none bg-[#202128] rounded-md border-b-0 focus:border-blue-700 w-[93%] pl-9 py-2"
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
              <div className="bg-[#131313] px-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                {querys &&
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
                    <div onClick={handleClickOnChatCard}>
                      <ChatCard />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-l-2 border-solid border-[#49494b]  h-full"></div>
        {/* default whatsapp page */}
        {!currentChat && (
          <div className=" max-w-max flex flex-col items-center justify-center h-full mx-20 text-white ">
            <div className=" max-w-[50%] text-center">
              <img className="opacity-70 mx-auto " src="cipher.png" alt="" />
              <h1 className="text-4xl text-gray-400 ">Cipher Messaging</h1>
              <p className="my-9 text-xl">Send and recieve messages </p>
            </div>
          </div>
        )}

        {/* Message part */}

        {currentChat && (
          <div className="w-[70%] relative  bg-black rounded-lg">
            {/* header */}
            <div className="header absolute w-full bg-[#131313] text-white rounded-lg z-10">
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

            <div className="px-6 mt-[75px] h-[74vh] overflow-y-auto rounded-lg relative ">
              <div className="rounded-lg  relative z-10 h-full ">
                <div className="space-y-1 flex flex-col justify-center py-2">
                  {[1, 1, 1, 1].map((item, i) => (
                    <MessageCard
                      key={i} // Don't forget to add a unique key when using map
                      isReqUserMessage={i % 2 === 0}
                      content={"message"}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Particles className="absolute inset-0 z-0" />
            {/* Footer Part */}
            <div className="footer bg-black absolute bottom-0 w-full py-3 text-2xl text-white rounded-lg ">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />

                <input
                  type="text"
                  className="py-2 outline-none border-none bg-[#131313] text-white pl-4 rounded-md w-[85%]"
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

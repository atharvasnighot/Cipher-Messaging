import { TbCircleDashed } from "react-icons/tb";
import { MdSend } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Snackbar, Alert } from "@mui/material";
import Fade from "@mui/material/Fade";
import {
  BsArrowLeft,
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import ChatCard from "./../ChatCard/ChatCard";
import MessageCard from "./../MessageCard/MessageCard";
import Profile from "./../Profile/Profile";
import CreateGroup from "../Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUser } from "../../Redux/Auth/Action";
import Particles from "./Particles";
import { createChat, getUsersChat } from "./../../Redux/Chat/Action";
import { createMessage, getAllMessage } from "./../../Redux/Message/Action";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import { useMediaQuery } from "react-responsive";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";

const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmojiClick = (emojiObject) => {
    console.log("emojiObject:", emojiObject);
    setContent(content + emojiObject.emoji);
  };
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const handleSearchIconClick = () => {
    setShowSearch((prevShowSearch) => !prevShowSearch);
  };

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleClickOnChatCard = (userId) => {
    // setCurrentChat(userId);
    // console.log(userId, "  ", token);
    dispatch(createChat({ token, data: { userId } }));
    setQuerys("");
  };

  const handleHome = () => {
    setCurrentChat(false);
    setActiveCard(null);
  };

  const handleNavigate = () => {
    // navigate("/profile")
    setProfile(true);
  };
  const handleCreateNewMessage = () => {
    dispatch(
      createMessage({
        token,
        data: { chatId: currentChat.id, content: content },
      })
    );
    setContent("");
  };
  const handleCreateGroup = () => {
    setIsGroup(true);
  };

  useEffect(() => {
    dispatch(getUsersChat({ token }));
  }, [chat.createdChat, chat.createdGroup, dispatch, token]);

  useEffect(() => {
    if (currentChat?.id)
      dispatch(getAllMessage({ chatId: currentChat.id, token }));
  }, [currentChat, message.newMessage, dispatch, token]);

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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    if (auth.reqUser) {
      setSnackbarMessage(`Welcome, ${auth.reqUser.full_name}!`);
      setOpenSnackbar(true);
    }
  }, [auth.reqUser]);

  const [stompCleint, setStompClient] = useState();
  const [isConnect, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  
  const connect = () => {
    const sock = new SockJS("http://localhost:8080/ws");
    const temp = over(sock);
    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${token}`,
      X_XSRF_TOKEN: getCookie("XSRF_TOKEN"),
    };

    temp.connect(headers, onConnect, onError);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  const onError = (error) => {
    console.log("no error ", error);
  };

  const onConnect = () => {
    setIsConnected(true);
  };

  useEffect(() => {
    if (message.newMessage && stompCleint && isConnect) {
      setMessages((prevMessages) => [...prevMessages, message.newMessage]);
      stompCleint.send("/app/message", {}, JSON.stringify(message.newMessage));
    }
  }, [message.newMessage, stompCleint, isConnect]);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    setMessages(message.messages);
  }, [message.messages]);

  const onMessageRecieve = (payload) => {
    console.log("received msg: ", JSON.parse(payload.body));
    const recieveMessage = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, recieveMessage]);
  };

  useEffect(() => {
    if (isConnect && stompCleint && auth.reqUser && currentChat) {
      const subscription = stompCleint.subscribe(
        "/group/" + currentChat.id.toString,
        onMessageRecieve
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnect, stompCleint, auth.reqUser, currentChat]);

  //dimak kharab.................

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

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token }));
  };

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };

  const [activeCard, setActiveCard] = useState(null);
  const handleCardClick = (clickedName) => {
    setActiveCard(null);
    setActiveCard(clickedName);
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={`relative ${isMobile ? "flex-col" : "flex"}`}>
      <div className={`w-full py-14 bg-[#1fadc3]`}></div>
      <div
        className={`flex bg-[#131313] ${
          isMobile ? "flex-col" : "h-[97vh]"
        } absolute top-[2vh] w-[98vw] left-[1vw] rounded-lg`}
      >
        <div
          className={`left ${
            isMobile ? "w-full bg-[#131313] " : "w-[30%]"
          } bg-[#131313] ${isMobile ? "h-full" : "h-full"} rounded-lg`}
        >
          {/* profile */}
          {isGroup && <CreateGroup setIsGroup={setIsGroup} />}
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
                    src={auth.reqUser?.profile_picture || "dummyq.png"}
                    alt=""
                  />
                  <p className="text-[18px]">{auth.reqUser?.full_name}</p>
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
              <div className="bg-[#131313] px-3 max-h-[calc(100vh-200px)] overflow-y-auto ">
                {querys &&
                  auth.searchUser?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleClickOnChatCard(item.id)}
                      className="mb-1"
                    >
                      <ChatCard
                        name={item.full_name}
                        userImg={item.profile_picture || "dummyq.png"}
                        onCardClick={handleCardClick}
                        active={chat.full_name === activeCard}
                        // timeStamp={}
                      />
                    </div>
                  ))}

                {chat.chats.length > 0 &&
                  !querys &&
                  chat.chats?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleCurrentChat(item)}
                      className="mb-1"
                    >
                      {item &&
                        (item.group ? (
                          <ChatCard
                            name={item.chat_name}
                            userImg={item.chat_image || "dummyq.png"}
                            onCardClick={handleCardClick}
                            active={chat.chat_name === activeCard}
                          />
                        ) : (
                          <ChatCard
                            isChat={true}
                            name={
                              auth.reqUser?.id !== item.users[0]?.id
                                ? item.users[0].full_name
                                : item.users[1].full_name
                            }
                            userImg={
                              auth.reqUser.id !== item.users[0].id
                                ? item.users[0].profile_picture || "dummyq.png"
                                : item.users[1].profile_picture || "dummyq.png"
                            }
                            onCardClick={handleCardClick}
                            active={
                              item.users[0].full_name === activeCard ||
                              item.users[1].full_name === activeCard
                            }
                          />
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-l-2 border-solid border-[#49494b] h-full"></div>
        {/* default whatsapp page */}
        {!currentChat && (
          <div className="hidden md:flex max-w-max flex-col items-center justify-center h-full mx-20 text-white">
            <div className=" max-w-[50%] text-center">
              <img className="mx-auto " src="cipher.png" alt="" />
              <h1 className="text-4xl text-gray-400 ">Cipher Messaging</h1>
              <p className="my-9 text-xl">Send and recieve messages </p>
            </div>
          </div>
        )}

        {/* Message part */}

        {currentChat && (
          <div
            className={`relative ${
              isMobile ? "w-full h-full" : "w-[70%]"
            } bg-black rounded-lg`}
          >
            {/* header */}
            <div className="header absolute w-full bg-[#131313] text-white rounded-lg z-10">
              <div className="flex justify-between rounded-lg ">
                <div className="py-3 space-x-4 flex items-center px-3 ">
                  <BsArrowLeft
                    className="text-xl cursor-pointer mr-0"
                    onClick={handleHome}
                  />
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      currentChat.isGroup
                        ? currentChat.chat_image
                        : auth.reqUser.id !== currentChat.users[0].id
                        ? currentChat.users[0].profile_picture || "dummyq.png"
                        : currentChat.users[1].profile_picture || "dummyq.png"
                    }
                    alt=""
                  />
                  <p>
                    {currentChat.isGroup
                      ? currentChat.chat_name
                      : auth.reqUser?.id === currentChat.users[0].id
                      ? currentChat.users[1].full_name
                      : currentChat.users[0].full_name}
                  </p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3">
                  <div
                    className={`cursor-pointer p-2 transition duration-300 ease-in-out hover:bg-[#292a30] active:bg-[#292a30] rounded-lg ${
                      showSearch ? "bg-[#292a30]" : ""
                    }`}
                    onClick={handleSearchIconClick}
                  >
                    <AiOutlineSearch className="text-xl" />
                  </div>
                  {showSearch && (
                    <div className="relative">
                      <input
                        ref={inputRef}
                        className="py-2 bg-[#131313] outline-none border-blue-400 text-white pl-4 rounded-md w-[85%] z-10 pr-12"
                        type="text"
                        placeholder="Search messages"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />

                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer transition duration-300 ease-in-out hover:bg-[#292a30] active:bg-[#292a30] p-2 rounded-lg"
                        onClick={() => {
                          setShowSearch(false);
                          setSearchTerm("");
                        }}
                      >
                        <AiOutlineClose className="text-xl" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* message section */}

            <div className="px-6 mt-[75px] h-[74vh] overflow-y-auto rounded-lg relative ">
              <div className="rounded-lg  relative z-10 h-full ">
                <div className="space-y-1 flex flex-col justify-center py-2">
                  {messages.length > 0 &&
                    messages?.map((item, i) => (
                      <MessageCard
                        key={i}
                        isReqUserMessage={item.user.id !== auth.reqUser.id}
                        content={item.content}
                        timeStamp={item.timeStamp}
                        searchTerm={searchTerm}
                      />
                    ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            <Particles className="absolute inset-0 z-0" />
            {/* Footer Part */}
            <div className="footer bg-black absolute bottom-0 w-full py-3 text-2xl text-white rounded-lg z-10 ">
              <div className="flex justify-between items-center px-5 relative">
                <div
                  className={`cursor-pointer p-2 transition duration-300 ease-in-out hover:bg-[#292a30] active:bg-[#292a30] rounded-lg ${
                    showEmojiPicker ? "bg-[#292a30]" : ""
                  }`}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <BsEmojiSmile />
                </div>

                <ImAttachment />

                <input
                  type="text"
                  className="py-2 outline-none border-none bg-[#131313] text-white pl-4 rounded-md w-[85%] z-10"
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

                {showEmojiPicker && (
                  <div className="absolute top-[-500px]">
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      height={500}
                      width={500}
                      theme={Theme.DARK}
                      emojiStyle={EmojiStyle.GOOGLE}
                    />
                    {console.log("EmojiStyle:", EmojiStyle)}
                  </div>
                )}

                {content ? (
                  <MdSend
                    onClick={handleCreateNewMessage}
                    className="text-3xl"
                  />
                ) : (
                  <BsMicFill />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: "100%",
            fontSize: "1.2rem",
            backgroundColor: "#1fadc3",
            color: "black",
            border: "1px solid black  ",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePage;

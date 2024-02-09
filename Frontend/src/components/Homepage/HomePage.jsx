import { TbCircleDashed } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Snackbar, Alert } from "@mui/material";
import Fade from "@mui/material/Fade";
import { BsFilter, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import ChatCard from "./../ChatCard/ChatCard";
import Profile from "./../Profile/Profile";
import CreateGroup from "../Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUser } from "../../Redux/Auth/Action";
import { createChat, getUsersChat } from "./../../Redux/Chat/Action";
import { createMessage, getAllMessage } from "./../../Redux/Message/Action";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import { useMediaQuery } from "react-responsive";
import ChatCardSkeleton from "../ChatCard/ChatCardSkeleton";
import DefaultPage from "./DefaultPage";
import MessageSec from "./MessageSec";
import { BiCommentDetail } from "react-icons/bi";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [msgloading, setMsgLoading] = useState(true);
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [messages, setMessages] = useState([]);
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [lastMessages, setLastMessages] = useState({});
  const [stompClient, setStompClient] = useState();
  const [isConnected, setIsConnected] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    console.log("emojiObject:", emojiObject);
    setContent(content + emojiObject.emoji);
  };

  useEffect(() => {
    const fetchLastMessages = async () => {
      const newLastMessages = {};
      for (const item of chat.chats) {
        newLastMessages[item.id] =
          item.id === messages[messages.length - 1]?.chat?.id &&
          messages[messages.length - 1]?.content;
      }
      setLastMessages(newLastMessages);
    };
    fetchLastMessages();
  }, [messages, chat.chats]);

  const handleSearchIconClick = () => {
    setShowSearch((prevShowSearch) => !prevShowSearch);
  };

  //for cursor on searchbar
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const handleClickOnChatCard = (item) => {
    dispatch(createChat({ token, data: { userId: item.id } }));
    // setCurrentChat(item);
    setQuerys("");
  };

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
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
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getUsersChat({ token }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [chat.createdChat, chat.createdGroup, dispatch, token]);

  //get all messages
  useEffect(() => {
    const fetchData = async () => {
      if (currentChat?.id) {
        setMsgLoading(true);

        try {
          await dispatch(getAllMessage({ chatId: currentChat.id, token }));
        } finally {
          setMsgLoading(false);
        }
      }
    };

    fetchData();
  }, [currentChat, dispatch, token]);
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

  useEffect(() => {
    if (auth.reqUser) {
      setSnackbarMessage(`Welcome, ${auth.reqUser.full_name}!`);
      setOpenSnackbar(true);
    }
  }, [auth.reqUser]);



  const connect = () => {
    const sock = new SockJS("http://localhost:8080/ws");
    const temp = over(sock);
    console.log("temp:", temp);
    setStompClient(temp);
  
    const headers = {
      Authorization: `Bearer ${token}`,
      "X_XSRF_TOKEN": getCookie("XSRF_TOKEN"),
    };
  
    temp.connect(headers, onConnect, onError);
  };
  
  useEffect(() => {
    console.log("stompClient in useEffect:", stompClient);
    if (isConnected && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        "/group/" + currentChat.id.toString(),
        onMessageReceive
      );
  
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, stompClient, auth.reqUser, currentChat]);
  

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  
  const onError = (error) => {
    console.log("Connection error: ", error);
  };
  
  const onConnect = () => {
    setIsConnected(true);
  };
  
  useEffect(() => {
    console.log("stompClient in useEffect:", stompClient);  // Log stompClient here
    if (message.newMessage && stompClient) {
      setMessages([...messages, message.newMessage]);
      stompClient.send("/app/message", {}, JSON.stringify(message.newMessage));
    }
  }, [message.newMessage, stompClient]);
  
  const onMessageReceive = (payload) => {
    console.log("Received msg: ", JSON.parse(payload.body));
    const receivedMessage = JSON.parse(payload.body);
    setMessages([...messages, receivedMessage]);
  };
  
  useEffect(() => {
    if (isConnected && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        "/group/" + currentChat.id.toString(),
        onMessageReceive
      );
      return () => {
        
        subscription.unsubscribe();
      };
    }
  }, [isConnected, stompClient, auth.reqUser, currentChat]);

   useEffect(()=>{
    connect();
  },[])

  
  useEffect(() => {
    setMessages(message.messages);
  }, [message.messages]);
  


  
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
          isMobile ? "flex-col" : "h-[96vh]"
        } absolute top-[2vh] w-[98vw] left-[1vw] rounded-lg`}
      >
        <div
          className={`left ${
            isMobile ? "w-full bg-[#131313] " : "min-w-[30%]"
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
                  <div className="transform cursor-pointer transition duration-300 ease-in-out hover:bg-[#292a30] active:bg-[#292a30] rounded-lg">
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
              <div className="bg-[#131313] px-3 h-screen sm:max-h-[calc(100vh-195px)] overflow-y-auto">
                {querys &&
                  auth.searchUser?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleClickOnChatCard(item)}
                      className="mb-1"
                    >
                      <ChatCard
                        name={item.full_name}
                        userImg={item.profile_picture || "dummyq.png"}
                        onCardClick={handleCardClick}
                        active={chat.full_name === activeCard}
                      />
                    </div>
                  ))}

                {chat.chats.length > 0 &&
                  !querys &&
                  chat.chats?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => isMobile? navigate(`/message/${item.id}`) : handleCurrentChat(item)}
                      className="mb-1"
                    >
                      {loading ? (
                        <ChatCardSkeleton />
                      ) : (
                        <>
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
                                    ? item.users[0].profile_picture ||
                                      "dummyq.png"
                                    : item.users[1].profile_picture ||
                                      "dummyq.png"
                                }
                                onCardClick={handleCardClick}
                                active={
                                  item.users[0].full_name === activeCard ||
                                  item.users[1].full_name === activeCard
                                }
                                // notification={notifications.length}
                                // isNotification={
                                //   notification[0]?.chat?.id === item.id
                                // }

                                // lastMessage={
                                //   (item.id===
                                //     messages[messages.length-1]?.chat?.id &&
                                //     messages[messages.length-1]?.content)
                                //     // (item.id===notifications[0]?.chat?.id&&
                                //     //   notification[0]?.content)

                                // }

                                lastMessage={lastMessages[item.id]}
                                timeStamp={
                                  item.id ===
                                    messages[messages.length - 1]?.chat?.id &&
                                  messages[messages.length - 1]?.timeStamp
                                }
                              />
                            ))}
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-l-2 border-solid border-[#49494b] h-full"></div>
        {/* default whatsapp page */}
        {!currentChat && <DefaultPage />}

        {/* Message part */}

        {currentChat && (
          <MessageSec
            currentChat={currentChat}
            isMobile={isMobile}
            handleHome={handleHome}
            handleSearchIconClick={handleSearchIconClick}
            handleCreateNewMessage={handleCreateNewMessage}
            handleEmojiClick={handleEmojiClick}
            msgloading={msgloading}
            messages={messages}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            content={content}
            setContent={setContent}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
          />
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
            borderRadius: "10px",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomePage;
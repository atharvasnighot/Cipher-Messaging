import { useRef, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsArrowLeft, BsEmojiSmile, BsMicFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import CircularProgress from "@mui/material/CircularProgress";
import Particles from "./Particles";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import { MdSend } from "react-icons/md";
import PropTypes from "prop-types";
import MessageCard from "./../MessageCard/MessageCard";
import { useSelector } from "react-redux";

const MessageSec = ({
  currentChat,
  isMobile,
  handleHome,
  handleSearchIconClick,
  handleCreateNewMessage,
  handleEmojiClick,
  msgloading,
  messages,
  searchTerm,
  setSearchTerm,
  showSearch,
  setShowSearch,
  content,
  setContent,
  showEmojiPicker,
  setShowEmojiPicker,
}) => {
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Check if it's a mobile screen and redirect to the /message route
    console.log("Current Chat:", currentChat);

    if (isMobile) {
      window.location.href = `/`;
    }
  }, [isMobile]);

  return (
    <div
      className={`relative ${
        window.innerWidth <= 767
          ? "w-full h-screen overflow-y-hidden"
          : "w-[70%]"
      } bg-black rounded-lg`}
    >
      {/* Header */}
      <div className="header absolute w-full bg-[#131313] text-white rounded-lg z-10">
        <div className="flex justify-between rounded-lg ">
          <div className="py-3 space-x-4 flex items-center px-3 ">
            <BsArrowLeft
              className="text-xl cursor-pointer mr-0"
              onClick={handleHome}
            />
            {currentChat && auth.reqUser && (
              <>
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
              </>
            )}
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

      {/* Message section */}
      <div className="px-6 mt-[75px] h-[79vh] overflow-y-auto rounded-lg relative">
        {msgloading ? (
          <div className="flex items-center justify-center h-full">
            <CircularProgress style={{ color: "white" }} size={40} />
          </div>
        ) : (
          <div className="rounded-lg relative z-10 h-full">
            <div className="space-y-1 flex flex-col justify-center py-2">
              { messages.length > 0 ? (
                messages.map((item, i) => (
                  <MessageCard
                    key={i}
                    isReqUserMessage={item.user.id !== auth.reqUser.id}
                    content={item.content}
                    timeStamp={item.timeStamp}
                    searchTerm={searchTerm}
                  />
                ))
              ) : (
                <p>No messages available</p>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
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
              if (e.key === "Enter") {
                if (content.trim() !== "") {
                  handleCreateNewMessage();
                  setContent("");
                }
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
            <MdSend onClick={handleCreateNewMessage} className="text-3xl" />
          ) : (
            <BsMicFill />
          )}
        </div>
      </div>
    </div>
  );
};

MessageSec.propTypes = {
  currentChat: PropTypes.shape({
    isGroup: PropTypes.bool,
    chat_image: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.func,
        profile_picture: PropTypes.string,
        full_name: PropTypes.string,
      })
    ),
    chat_name: PropTypes.string,
  }),
  isMobile: PropTypes.bool,
  handleHome: PropTypes.func,
  handleSearchIconClick: PropTypes.func,
  handleCreateNewMessage: PropTypes.func,
  handleEmojiClick: PropTypes.func,
  msgloading: PropTypes.bool,
  messages: PropTypes.array,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  showSearch: PropTypes.bool,
  setShowSearch: PropTypes.func,
  content: PropTypes.string,
  setContent: PropTypes.func,
  showEmojiPicker: PropTypes.bool,
  setShowEmojiPicker: PropTypes.func,
};
MessageSec.defaultProps = {
  currentChat: {},
};

export default MessageSec;

import PropTypes from "prop-types";

const MessageCard = ({ isReqUserMessage, content, timeStamp, searchTerm }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isSearchTermMatch =
    searchTerm && content.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div
      className={`px-3 py-2 max-w-[70%] flex justify-between rounded-[15px] ${
        isReqUserMessage
          ? "self-start bg-[#131310] text-white"
          : "self-end bg-gray-100  text-black"
      } ${isSearchTermMatch ? "bg-yellow-300" : ""}`}
    >
      <p>{content}</p>
      <p className="text-xs text-gray-500 mt-3 pl-2">{formatTime(timeStamp)}</p>
    </div>
  );
};

MessageCard.propTypes = {
  isReqUserMessage: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  timeStamp: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
};

export default MessageCard;

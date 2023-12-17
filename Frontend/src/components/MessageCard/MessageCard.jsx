
const MessageCard = ({ isReqUserMessage, content, timeStamp }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`px-3 py-3 max-w-[70%] flex justify-between ${
        isReqUserMessage
          ? 'self-start bg-[#131310] text-white'
          : 'self-end bg-gray-100  text-black'
      } rounded-[15px]`}
    >
      <p>{content}</p>
      <p className="text-xs text-gray-500 mt-3 pl-2">{formatTime(timeStamp)}</p>
    </div>
  );
};

export default MessageCard;

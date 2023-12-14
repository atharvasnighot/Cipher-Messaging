const MessageCard = ({isReqUserMessage,content}) => {
  return (
    <div
    className={`px-3 py-3 max-w-[70%] ${
      isReqUserMessage
        ? "self-start bg-[#131310] text-white"
        : "self-end bg-gray-200 text-gray-800"
    } rounded-[15px]`}
  >
      <p>{content}</p>
    </div>
  )
}

export default MessageCard

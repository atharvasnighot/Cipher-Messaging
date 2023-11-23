
const MessageCard = (isReqUserMessage,content) => {
  return (
     <div className={`py-2 px-2 rounded-md ${isReqUserMessage ? "self-start bg-white" : "self-end bg-[#39A7FF]"} flex-shrink-0`} style={{ maxWidth: '50%' }}>
      <p>{content}</p>
    </div>
  )
}

export default MessageCard
const MessageCard = (isReqUserMessage,content) => {
  return (
    <div className= {`px-3 py-3 rounded-md max-w-[50%] ${isReqUserMessage?"self-start bg-white":"self-end bg-blue-600"} `}>
      {/* <p>{content}</p> */}
    </div>
  )
}

export default MessageCard
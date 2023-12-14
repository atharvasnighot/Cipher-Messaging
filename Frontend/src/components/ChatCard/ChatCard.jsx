const ChatCard = ({ userImg, name }) => {
  return (
    <div className="flex items-center justify-center py-2 px-2  group cursor-pointer bg-[#131313] rounded-md transition-all duration-300 transform hover:shadow-lg hover:bg-[#292a30]">
      <div className="w-1/5">
        {/* Set a fixed width for the image container */}
        <img className="h-14 w-14 rounded-full" src={userImg || "dummyq.png"} alt="" />
      </div>
      <div className=" w-3/4 pr-2">
        {/* Use the remaining width for the name container */}
        <div className="flex justify-between items-center text-white">
          <p className="text-lg">{name}</p>
          <p className="text-sm">timestamp</p>
        </div>

        <div className="flex justify-between">
          <p>message...</p>
          <div className="flex space-x-2 items-center">
            <p className="text-sm py-1 px-2 text-black font-bold bg-white rounded-full">1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;

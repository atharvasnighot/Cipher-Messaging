const ChatCard = () => {
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer">
      <div className="w-[20%]">
        <img className="h-14 w-14 rounded-full" src="nigga.png" alt="" />
      </div>
      <div className="pl-5 w-[80%]">
        <div className="flex justify-between items-center">
          <p className="text-lg">username</p>
          <p className="text-sm">timestamp</p>
        </div>

        <div className="flex justify-between ">
            <p>message...</p>
            <div className="flex space-x-2 items-center">
                <p className="text-xs  py-1 px-2 text-white bg-[#39A7FF] rounded-full">2</p>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default ChatCard;

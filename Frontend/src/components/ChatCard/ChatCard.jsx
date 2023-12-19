import  { useState } from "react";

const ChatCard = ({ userImg, name, timeStamp, onCardClick, active, lastMessage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    onCardClick(name); // Notify the parent about the click
  };

  const cardClassName = `flex items-center justify-center py-2 px-2 group cursor-pointer rounded-md transition-all duration-300 ${
    (isHovered || active) ? "bg-[#292a30] shadow-lg" : "bg-[#131313] hover:shadow-lg"
  }`;

  return (
    <div
      className={cardClassName}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-1/5">
        <img
          className="h-14 w-14 rounded-full"
          src={userImg || "dummyq.png"}
          alt=""
        />
      </div>
      <div className="w-3/4 pr-2">
        <div className="flex justify-between items-center text-white">
          <p className="text-lg">{name}</p>
          <p className="text-sm">{timeStamp}</p>
        </div>
        <div className="flex justify-between">
          <p>{lastMessage}</p>
          <div className="flex space-x-2 items-center">
            <p className="text-sm py-1 px-2 text-black font-bold bg-[#00ADB5] rounded-full">
              1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;

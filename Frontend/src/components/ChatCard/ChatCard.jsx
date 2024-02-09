import  { useState } from "react";
// import PropTypes from 'prop-types';

const ChatCard = ({ userImg, name, timeStamp, onCardClick, active,lastMessage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    onCardClick(name); // Notify the parent about the click
  };

  const cardClassName = `flex items-center justify-center py-2 px-2 h-[80px] group cursor-pointer rounded-md transition-all duration-300 ${
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
          <p className="text-sm text-gray-400">{formatTime(timeStamp)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-400">{lastMessage}</p>
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

// ChatCard.propTypes = {
//   userImg: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   timeStamp: PropTypes.bool,
//   onCardClick: PropTypes.func.isRequired,
//   active: PropTypes.bool.isRequired,
//   lastMessage: PropTypes.bool,
// };

export default ChatCard;

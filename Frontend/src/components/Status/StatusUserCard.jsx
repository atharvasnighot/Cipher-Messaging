import { useNavigate } from "react-router-dom";

const StatusUserCard = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/status/{userId}`);
  };
  return (
    <div onClick={handleNavigate} className="flex items-center cursor-pointer p-3">
      <div>
        <img
          className="h-7 w-7 lg:w-10 lg:h-10 rounded-full"
          src="luffy.jpeg"
          alt=""
        />
      </div>
      <div className="ml-2 text-white">
        <p>username</p>
      </div>
    </div>
  );
};

export default StatusUserCard;

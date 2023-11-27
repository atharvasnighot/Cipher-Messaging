import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#1c354f] text-white pt-16 px-10 pb-6">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleNavigate}
        />
        <p className="cursor-pointer font-semibold">Profile</p>
      </div>

      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img className="rounded-full w-[15vw] h-[15vw] cursor-pointer" src="luffy.jpeg" alt="" />
          <input type="file" id="imgInput" className="hidden"/>
        </label>
      </div>
    </div>
  );
};

export default Profile;

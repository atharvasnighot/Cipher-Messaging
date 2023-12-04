import { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";

const Profile = ({handleCloseOpenProfile}) => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);

  const handleFlag = () => {
    setFlag(true);
  };

  const handleCheckClick = () => {
    setFlag(false);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="w-full h-full bg-white rounded-md">
      <div className="flex items-center rounded-md space-x-10 bg-[#3e7bd2] text-white pt-16 px-10 pb-6 relative">
        <BsArrowLeft
          className="cursor-pointer text-4xl absolute top-4 left-4"
          onClick={handleCloseOpenProfile}
        />
        <p className="cursor-pointer font-semibold text-2xl">Profile</p>
      </div>
      {/* update profile pic section */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
            src="luffy.jpeg"
            alt=""
          />
        </label>
        <input type="file" id="imgInput" className="hidden" />
      </div>

      {/* name section */}
      <div>
        <div className="bg-[#cbced7] p-3 ml-6 w-[90%] rounded-md">
          <p className="py-3 text-xl">Your Name</p>

          {!flag && (
            <div className="w-full flex justify-between items-center">
              <p className="py-3 text-xl">{username || "Username"}</p>
              <BsPencil onClick={handleFlag} className="cursor-pointer" />
            </div>
          )}

          {flag && (
            <div className="w-full flex justify-between items-center py-2">
              <input
                onChange={handleChange}
                className="w-[80%] outline-none border-b-2 border-blue-700 p-2"
                type="text"
                placeholder="Enter your name"
              />
              <BsCheck2
                onClick={handleCheckClick}
                className="cursor-pointer text-2xl"
              />
            </div>
          )}
        </div>
      </div>

      {/* <div className="px-3 my-5">
        <p className="py-10">
          This is not your username, this name will be visible to your WhatsApp
          contacts
        </p>
      </div> */}
    </div>
  );
};

export default Profile;

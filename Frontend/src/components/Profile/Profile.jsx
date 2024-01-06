import { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/Auth/Action";
import { CircularProgress } from "@mui/material";
import PropTypes from 'prop-types';


const Profile = ({ handleCloseOpenProfile }) => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);
  const [tempPic, setTempPic] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleFlag = () => {
    setFlag(true);
  };

  const handleCheckClick = () => {
    setFlag(false);
    const data = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: { full_name: username },
    };
    console.log("Update User Data:", data); // Add this line
    dispatch(updateUser(data));
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const handleUpdateName = (e) => {
    const data = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: { full_name: username },
    };
    if (e.target.key === "Enter") dispatch(updateUser(data));
  };

  const uploadImg = (pics) => {
  setIsImageUploading(true);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "CipherMsg");
    data.append("cloud_name", "dudjrvtiv");
    fetch("https://api.cloudinary.com/v1_1/dudjrvtiv/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Imgurl", data);
        setTempPic(data.url.toString());
        setIsImageUploading(false);
        //setMessage("Profile Image updated successfully")
        //setOpen(true);
        const data2 = {
          id: auth.reqUser.id,
          token: localStorage.getItem("token"),
          data: { profile_picture: data.url.toString() },
        };
        //userUpdate(id,)
        dispatch(updateUser(data2));
      });
  };
  return (
    <div className="w-full h-full bg-black rounded-md">
      <div className="flex items-center rounded-md space-x-10 bg-[#131313] text-white pt-16 px-10 pb-6 relative">
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
            src={auth.reqUser?.profile_picture || tempPic || "dummyq.png"}
            alt=""
          />
          {isImageUploading && (
              <CircularProgress color="inherit" className="absolute top-[15rem] left-[9rem]" />
            )}
        </label>
        <input
          onChange={(e) => uploadImg(e.target.files[0])}
          type="file"
          id="imgInput"
          className="hidden"
        />
      </div>

      {/* name section */}
      <div>
        <div className="bg-[#2a2b2e] p-3 ml-6 w-[90%] rounded-md text-white">
          <p className="py-3 text-xl">Your Name</p>

          {!flag && (
            <div className="w-full flex justify-between items-center">
              <p className="py-3 text-xl">{auth.reqUser.full_name || "Username"}</p>
              <BsPencil onClick={handleFlag} className="cursor-pointer" />
            </div>
          )}

          {flag && (
            <div className="w-full flex justify-between text-white items-center py-2">
              <input
                onKeyPress={handleUpdateName}
                onChange={handleChange}
                className="w-[80%] outline-none bg-black rounded-lg p-2"
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
Profile.propTypes = {
  handleCloseOpenProfile: PropTypes.func.isRequired,
};

export default Profile;

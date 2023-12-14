import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {createGroupChat } from "../../Redux/Chat/Action";

const NewGroup = ({ groupMember, setIsGroup }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupImage, setGroupImage] = useState(null);
  const [groupName, setGroupName] = useState();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  

  const uploadImg = (pics) => {
    setIsImageUploading(true)
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
        setGroupImage(data.url.toString());
        setIsImageUploading(false);
      }); 
  };

  const handleCreateGroup = () => {
    let userIds = [];
    for (let user of groupMember) {
      userIds.push(user.id);
    }
    const group = {
      userIds,
      chat_name: groupName,
      chat_image: groupImage,
    };
    const data = {
      group,
      token,
    };

    dispatch(createGroupChat(data));
    console.log(data)
    setIsGroup(false);
  };

  return (
    <div className="w-full h-full ">
      <>
        <div className="flex items-center space-x-10 bg-black pt-16 px-10 pb-5 rounded-lg relative">
          <BsArrowLeft className="cursor-pointer text-2xl text-white font-bold" />
          <p className="text-xl text-white font-semibold">New Group</p>
        </div>

        <div className="flex flex-col justify-center items-center my-10">
          <label htmlFor="imgInput" className="">
            <img
              className="rounded-full w-[16vw] h-[16vw] cursor-pointer"
              src={groupImage||"dummyq.png"}
              alt=""
            />
            {isImageUploading && (
              <CircularProgress color="inherit" className="absolute top-[15rem] left-[9rem]" />
            )}
          </label>
          <input
            type="file"
            id="imgInput"
            className="hidden"
            onChange={(e) => uploadImg(e.target.files[0] ) }
            value={""}
          />
        </div>
        <div className="w-full flex justify-center items-center py-2 px-5 ">
          <input
            className="w-full outline-none px-2 bg-[#202128] py-2 rounded-md"
            placeholder="Group Subject "
            value={groupName}
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        {groupName && (
          <div className="py-10 absolute bottom-0 w-[30%] bg-transparent flex items-center justify-center">
            <Button onClick={handleCreateGroup}>
              <div className="bg-white rounded-full p-4 ">
                <BsCheck2 className="text-black font-bold text-3xl" />
              </div>
            </Button>
          </div>
        )}
      </>
    </div>
  );
};

export default NewGroup;

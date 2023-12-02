import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";

const NewGroup = () => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState();
  return (
    <div className="w-full h-full ">
      <>
        <div className="flex items-center space-x-10 bg-[#3e7bd2] pt-16 px-10 pb-5 rounded-lg relative">
          <BsArrowLeft className="cursor-pointer text-2xl text-white font-bold" />
          <p className="text-xl text-white font-semibold">New Group</p>
        </div>

        <div className="flex flex-col justify-center items-center my-12 ">
          <label htmlFor="imgInput" className="">
            <img
              className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
              src="luffy.jpeg"
              alt=""
            />
            {isImageUploading && (
              <CircularProgress className="absolute top-[5rem] left-[6rem]" />
            )}
          </label>
          <input
            type="file"
            id="imgInput"
            className="hidden"
            onChange={() => console.log("Img Upolode")}
            value={""}
          />
        </div>
        <div className="w-full flex justify-center items-center py-2 px-5 ">
          <input
            className="w-full outline-none border-b-2 border-blue-600 px-2 bg-transparent"
            placeholder="Group Subject "
            value={groupName}
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        {groupName && (
          <div className="py-10 absolute bottom-0 w-[30%] bg-transparent flex items-center justify-center">
            <Button>
              <div className="bg-[#3e7bd2] rounded-full p-4 ">
                <BsCheck2 className="text-white font-bold text-3xl" />
              </div>
            </Button>
          </div>
        )}
      </>
    </div>
  );
};

export default NewGroup;

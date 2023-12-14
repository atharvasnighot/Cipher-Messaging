import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({handleRemoveMember,member}) => {
  return (
    <div className="flex items-center bg-black rounded-full">
      <img className="w-7 h-7 rounded-full" src={member.profile_picture || "dummyq.png" }  alt="" />
      <p className="px-2 ">{member.full_name}</p>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="pr-1 cursor-pointer"
      />
    </div>
  );
};

export default SelectedMember;

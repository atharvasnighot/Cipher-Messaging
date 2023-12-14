import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import SelectedMember from "./SelectedMember";
import ChatCard from "../ChatCard/ChatCard";
import NewGroup from "./NewGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/Action";

const CreateGroup = ({ setIsGroup }) => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);
  const handleNavigate = () => {
    navigate(-1);
  };

  const handleSearch = () => {
    dispatch(searchUser({ keyword: query, token }));
  };
  const handleRemoveMember = (item) => {
    groupMember.delete(item);
    setGroupMember(groupMember);
  };

  return (
    <div className="w-full h-full text-white">
      {!newGroup && (
        <>
          <div className="relative ">
            <BsArrowLeft
              className="cursor-pointer text-3xl font-bold absolute top-4 left-4"
              onClick={handleNavigate}
            />
            <div className="flex items-center space-x-10 bg-[#131313] rounded-lg text-white pt-16 px-10 pb-5 ">
              <p className="text-xl font-bold">Add Group Participant</p>
            </div>

            <div className="relative bg-[#131313] py-4 px-3">
              <div className="flex space-x-2 flex-wrap space-y-1">
                {groupMember.size > 0 &&
                  Array.from(groupMember).map((item) => (
                    <SelectedMember
                      key={item.id}
                      handleRemoveMember={() => handleRemoveMember(item)}
                      member={item}
                    />
                  ))}
              </div>
              <input
                className="bg-[#202128] rounded-lg outline-none p-2 w-[93%]"
                type="text"
                onChange={(e) => {
                  handleSearch(e.target.value);
                  setQuery(e.target.value);
                }}
                placeholder="Search user"
                value={query}
              />
            </div>
            <div className=" bg-[#131313] overflow-y-scroll h-[50vh]">
              {query &&
                auth.searchUser?.map((item) => (
                  <div
                    className="px-4"
                    onClick={() => {
                      groupMember.add(item);
                      setGroupMember(groupMember);
                      setQuery("");
                    }}
                    key={item?.id}
                  >
                    <ChatCard
                      userImg={item.profile_picture}
                      name={item.full_name}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="absolute bottom-0 py-10 w-[30%] bg-transparent flex items-center justify-center">
            <div
              className="bg-white rounded-full p-4 cursor-pointer"
              onClick={() => {
                setNewGroup(true);
              }}
            >
              <BsArrowRight className="text-black font-bold text-3xl" />
            </div>
          </div>
        </>
      )}
      {newGroup && (
        <NewGroup groupMember={groupMember} setIsGroup={setIsGroup} />
      )}
    </div>
  );
};

export default CreateGroup;

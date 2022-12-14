import { FaUserFriends } from "react-icons/fa";
import { BsBookmarkFill } from "react-icons/bs";
import { AiFillFlag } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleLeftSide } from "../store/useraction/UserActionSlicer";

const LeftSidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const toggle = useSelector((state) => state.useraction.leftSide);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const icon = [
    {
      icon: <FaUserFriends />,
      title: "Friends",
      color: "text-[#1773E7]",
    },
    {
      icon: <BsBookmarkFill />,
      title: "Saved",
      color: "text-[#8138CE]",
    },
  ];

  return (
    <div
      className={`md:w-[25%] h-[100vh] md:fixed fixed md:left-0 sm:w-[80%] w-full pt-[10px] md:bg-[#F0F2F5] bg-white z-[999] duration-500 ${
        toggle ? "left-0" : "left-[-100%]"
      }`}
    >
      <div className="pl-[10px] border-b border-gray-300 pb-[10px]">
        <div
          className="flex items-center space-x-[10px] hover:bg-gray-200 py-[10px] px-[10px] rounded-[5px] cursor-pointer"
          onClick={() => {
            nav(`/main/profile/${user?.id}`);
            dispatch(toggleLeftSide());
          }}
        >
          <img
            src={user?.photoUrl}
            className="rounded-full h-[36px] w-[36px] object-cover"
            alt=""
          />
          <p className="text-[14px] tracking-wide">{user?.displayName}</p>
        </div>

        {icon.map((i, index) => (
          <div
            onClick={() => dispatch(toggleLeftSide())}
            key={index}
            className="flex items-center space-x-[10px] hover:bg-gray-200 py-[10px] px-[10px] rounded-[5px] cursor-pointer"
          >
            <div
              className={`w-[36px] text-[23px] flex justify-center ${i.color}`}
            >
              {i.icon}
            </div>
            <p className="text-[14px] tracking-wide">{i.title}</p>
          </div>
        ))}

        <div className="flex items-center space-x-[10px] hover:bg-gray-200 py-[10px] px-[10px] rounded-[5px] cursor-pointer">
          <div className="w-[30px] h-[30px] bg-gray-300 rounded-full flex justify-center items-center">
            <BiChevronDown className="text-[24px]" />
          </div>
          <p className="text-[14px] tracking-wide">See more</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

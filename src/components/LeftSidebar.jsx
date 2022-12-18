import { FaUserFriends } from "react-icons/fa";
import { BsBookmarkFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleLeftSide } from "../store/useraction/UserActionSlicer";
import { MdOndemandVideo } from "react-icons/md";
import { RiGroup2Line } from "react-icons/ri";
import { SiFacebookgaming } from "react-icons/si";

const LeftSidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const toggle = useSelector((state) => state.useraction.leftSide);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const icon = [
    {
      icon: <AiFillHome />,
      title: "Home",
      path: "/main",
      color: "text-[#1773E7]",
    },
    {
      icon: <FaUserFriends />,
      title: "Friends",
      path: "/no",
      color: "text-[#8138CE]",
    },
    {
      icon: <MdOndemandVideo />,
      title: "Videos",
      path: "/no",
      color: "text-[#FF4500]",
    },
    ,
    {
      icon: <RiGroup2Line />,
      title: "Groups",
      path: "/no",
      color: "text-blue-700",
    },
    {
      icon: <SiFacebookgaming />,
      title: "Gamings",
      path: "no",
      color: "text-blue-700",
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
          <NavLink
            to={i.path}
            end
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
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;

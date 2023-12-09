import { FaHome, FaRegUser } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { CiHashtag } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageCircle } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IoEarth } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Sidebar(active, userDetail) {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      <div className="hoverEffect text-center flex items-center">
        <h1 className="hidden xl:flex xl:items-center font-bold text-xl sm:text-3xl text-blue-600 p-3 ">
          Soci{""}
          <span>
            <IoEarth />
          </span>
          Sphere
        </h1>
        <h1 className="font-bold text-2xl md:inline hidden sm:block xl:hidden text-blue-600 p-3 ">
          <span>
            <IoEarth />
          </span>
        </h1>
      </div>
      <div className="mt-4 mb-2.5 xl:items-start">
        <div className="flex items-center hoverEffect text-gray-700 justify-center xl:justify-start text-lg  space-x-3">
          <FaHome />
          <span className={`${active && "font-bold"} hidden  xl:inline`}>
            Home
          </span>
        </div>
        <div className="flex items-center hoverEffect text-gray-700 justify-center xl:justify-start text-lg  space-x-3">
          <CiHashtag />
          <span className="hidden xl:inline">Explore</span>
        </div>
        <div className="flex items-center hoverEffect text-gray-700 justify-center xl:justify-start text-lg  space-x-3">
          <IoMdNotificationsOutline />
          <span className="hidden xl:inline">Notification</span>
        </div>
        <div className="flex items-center hoverEffect text-gray-700 justify-center xl:justify-start text-lg  space-x-3">
          <LuMessageCircle />
          <span className="hidden xl:inline">Messages</span>
        </div>
        <div className="flex items-center hoverEffect text-gray-700 justify-center xl:justify-start text-lg  space-x-3">
          <FaRegBookmark />
          <span className="hidden xl:inline">Saved</span>
        </div>
        <div className="flex items-center hoverEffect text-gray-700 justify-center xl:justify-start text-lg  space-x-3">
          <FaRegUser />
          <span className="hidden xl:inline">Profile</span>
        </div>
      </div>
      <Link
        to="/profile"
        className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto"
      >
        <img
          src={currentUser.profilePic}
          alt=""
          className="rounded-full w-10 h-10 object-cover mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h1 className="font-bold ">
            {currentUser.firstName} {currentUser.lastName}
          </h1>
          <p className="text-gray-500 ">@{currentUser.userName}</p>
        </div>
      </Link>
    </div>
  );
}

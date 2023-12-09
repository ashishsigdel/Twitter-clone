import { FaHome, FaRegUser } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { CiHashtag } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Sidebar(active) {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      <div className="hoverEffect">
        <h1 className="font-bold text-xl sm:text-3xl text-blue-600">
          SocioSphere
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
          src="https://i.postimg.cc/L5dwcByy/photo-2023-05-11-21-07-51.jpg"
          alt=""
          className="rounded-full w-10 h-10 object-cover mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h1 className="font-bold ">Ashish sigdel</h1>
          <p className="text-gray-500 ">@js_monster</p>
        </div>
      </Link>
    </div>
  );
}

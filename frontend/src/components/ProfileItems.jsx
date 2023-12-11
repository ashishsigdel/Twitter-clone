import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { FaGenderless } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { SlUser, SlUserFemale } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Post from "./Post";
import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modalAtom";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice.js";

export default function Profile() {
  const posts = [
    {
      id: "1",
      name: "Ashish Sigdel",
      username: "codewithashish",
      userImg: "https://i.postimg.cc/L5dwcByy/photo-2023-05-11-21-07-51.jpg",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80",
      text: "nice view!",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Ashish Sigdel",
      username: "codewithashish",
      userImg: "https://i.postimg.cc/L5dwcByy/photo-2023-05-11-21-07-51.jpg",
      img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
      text: "wow!",
      timestamp: "2 days ago",
    },
  ];
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useRecoilState(modalState);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      dispatch(signOutStart);
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <div className="xl:ml-[300px] border-l border-r border-gray-200  xl:min-w-[700px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="p-3 mx-auto">
        <div className="flex flex-wrap gap-0 sm:gap-10 max-h-96 overflow-y-auto border-b">
          <div className="flex flex-col">
            <img
              src={currentUser.profilePic}
              alt="profile"
              className="rounded-full w-28 h-28 object-cover my-3 mx-5"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-16">
            <h1 className="font-semibold text-center whitespace-nowrap text-3xl">
              {currentUser.firstName} {currentUser.lastName}
            </h1>
            <p className="text-gray-600 text-sm">@{currentUser.userName}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between mt-4 p-4 border-b">
          <h1 className="font-semibold my-4">Basic info</h1>
          <div className=" flex items-center gap-4">
            <MdEmail className="scale-125" />
            <div className="flex flex-col">
              <p>{currentUser.email}</p>
              <span className="text-xs text-gray-500">Email</span>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <FaBirthdayCake className="scale-125" />
            <div className="flex flex-col">
              <p>
                {currentUser.birthDay}-{currentUser.birthMonth}-
                {currentUser.birthYear}
              </p>
              <span className="text-xs text-gray-500">Birthday</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentUser.gender === "male" ? (
              <SlUser className="scale-125" />
            ) : currentUser.gender === "female" ? (
              <SlUserFemale className="scale-125" />
            ) : (
              <FaGenderless className="scale-125" />
            )}
            <div className="flex flex-col">
              <p>{currentUser.gender}</p>
              <span className="text-xs text-gray-500">Gender</span>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-blue-800 text-white px-3 py-2 rounded-md"
            >
              <MdModeEditOutline />
              <span>Edit info</span>
            </button>

            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 bg-blue-800 text-white px-3 py-2 rounded-md"
            >
              <IoIosLogOut />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

import { IoMdHappy } from "react-icons/io";
import { MdPhoto } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Input() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex bg-white  border-b border-gray-200 p-3 space-x-3">
      <img
        src={currentUser.profilePic}
        alt="user-img"
        className="w-10 h-10 object-cover rounded-full"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 focus:outline-none"
            rows="2"
            placeholder="What's happening?"
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex">
            <MdPhoto className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            <IoMdHappy className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
          </div>
          <button className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

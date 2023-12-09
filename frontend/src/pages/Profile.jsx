import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { MdEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { FaGenderless } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePic: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-xl mx-auto bg-white shadow-lg mt-5">
      <h1 className="text-3xl text-center font-semibold my-5">Profile</h1>
      <input
        ref={fileRef}
        onChange={(e) => setFile(e.target.files[0])}
        hidden
        type="file"
        accept="image/*"
      />
      <img
        src={formData.profilePic || currentUser.profilePic}
        alt="profile"
        className="rounded-full w-24 h-24 object-cover mx-auto my-6"
        onClick={() => fileRef.current.click()}
      />
      <p className="text-sm text-center">
        {fileUploadError ? (
          <span className="text-red-500">Error Image Upload!</span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-800">{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className="text-green-600">Image upload successfully.</span>
        ) : (
          ""
        )}
      </p>
      <h1 className="font-semibold text-center mt-3 text-3xl">
        {currentUser.firstName} {currentUser.lastName}
      </h1>
      <div className="flex flex-col justify-between mt-4 p-4">
        <div className=" flex items-center gap-2">
          <MdEmail />
          <p>{currentUser.email}</p>
        </div>
        <div className=" flex items-center gap-2">
          <FaBirthdayCake />
          <p>
            {currentUser.birthDay}-{currentUser.birthMonth}-
            {currentUser.birthYear}
          </p>
        </div>
        <div className=" flex items-center gap-2">
          <FaGenderless />
          <p>{currentUser.gender}</p>
        </div>
      </div>
      <div className="flex">
        <button className="flex items-center gap-2 bg-blue-800 text-white p-2 rounded-md mx-auto">
          <MdModeEditOutline />
          <span>Edit</span>
        </button>
        <button className="flex items-center gap-2 bg-blue-800 text-white p-2 rounded-md mx-auto">
          <MdOutlineUpdate />
          <span>Update</span>
        </button>
      </div>
      <div className="flex justify-between p-3">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

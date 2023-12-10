import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modalAtom.js";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function ProfileUpdateModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [file, setFile] = useState(undefined);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef(null);
  const handleSubmit = () => {};
  const handleChange = () => {};

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

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
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] absolute top-5 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-lg shadow-md overflow-auto"
        >
          <div className="p-3">
            <div className="flex items-center  border-b border-gray-200 pb-2">
              <h1 className="mx-auto font-semibold text-xl">Edit Profile</h1>
              <div
                onClick={() => setOpen(false)}
                className="p-2 hoverEffect w-9 h-9 flex items-center justify-end  "
              >
                <MdClose className="scale-150 text-gray-700" />
              </div>
            </div>
            <div className="flex justify-between ">
              <form onSubmit={handleSubmit} className="mt-5 w-full">
                <div>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    ref={fileRef}
                    hidden
                  />
                  <img
                    src={formData.profilePic || currentUser.profilePic}
                    alt=""
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                    onClick={() => fileRef.current.click()}
                  />
                  <p className="text-sm my-2 text-center">
                    {fileUploadError ? (
                      <span className="text-red-500">Error Image Upload!</span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                      <span className="text-slate-800">{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                      <span className="text-green-600">
                        Image upload successfully.
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <div className="flex justify-around gap-1 mt-2">
                  <input
                    type="text"
                    id="firstName"
                    className="border p-1 rounded-md w-44 focus:outline-none"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    id="lastName"
                    className="border p-1 rounded-md w-44 focus:outline-none "
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="my-3">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="border p-1 rounded-md  w-full focus:outline-none "
                    onChange={handleChange}
                  />
                </div>
                <div className="my-3">
                  <input
                    type="password"
                    id="password"
                    placeholder="New password"
                    className="border p-1 rounded-md  w-full focus:outline-none "
                    onChange={handleChange}
                  />
                </div>
                <div className="my-3">
                  <span className="text-xs font-semibold">Birthday</span>
                  <div className=" flex justify-between gap-3">
                    <input
                      type="number"
                      min={1}
                      max={31}
                      id="day"
                      className="border p-1 rounded-md w-32 focus:outline-none "
                      onChange={handleChange}
                      placeholder="Day"
                    />
                    <select
                      id="month"
                      className="border p-1 rounded-md w-32 focus:outline-none"
                      onChange={handleChange}
                      placeholder="Month"
                      value={formData.month}
                    >
                      <option value="" disabled>
                        Select Month
                      </option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <input
                      type="number"
                      id="year"
                      min={1900}
                      className="border p-1 rounded-md w-32 focus:outline-none"
                      onChange={handleChange}
                      placeholder="Year"
                    />
                  </div>
                </div>
                <div className="my-3">
                  <span className="text-xs font-semibold">Gender</span>
                  <div className=" flex justify-between px-1">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="female"
                        className="border p-1 rounded-md  focus:outline-none scale-125"
                        onChange={handleChange}
                        checked={formData.gender === "female"}
                      />
                      <span>Female</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="male"
                        className="border p-1 rounded-md focus:outline-none scale-125"
                        onChange={handleChange}
                        checked={formData.gender === "male"}
                      />
                      <span>Male</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="other"
                        className="border p-1 rounded-md focus:outline-none scale-125"
                        onChange={handleChange}
                        checked={formData.gender === "other"}
                      />
                      <span>Other</span>
                    </div>
                  </div>
                </div>
                <div className="text-center py-5">
                  <button
                    disabled={loading}
                    className="w-50 bg-green-600 text-white py-1 px-7 min-w-min rounded-lg text-center hover:bg-green-700 transition duration-500 disabled:opacity-80"
                  >
                    {loading ? "Loading..." : "Update"}
                  </button>
                  {error && (
                    <p className="text-sm text-red-500 my-3">{error}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { IoEarth } from "react-icons/io5";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  console.log(formData);
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex flex-col justify-center items-center md:flex-row sm:min-h-screen">
      <div className="px-40 flex-1">
        <h1 className="flex items-center text-blue-700 text-3xl sm:text-5xl font-bold mt-3">
          Soci{""}
          <span>
            <IoEarth />
          </span>
          Sphere
        </h1>
        <p className="text-2xl py-7 hidden md:inline-block">
          SocioSphere helps you connect and <br /> share with the people in your
          life.
        </p>
      </div>

      <div className="bg-white w-96 px-3 py-5 sm:p-5 flex flex-col justify-center items-center mx-auto my-20  sm:mr-52 shadow-lg rounded-lg">
        <h1 className="font-semibold text-3xl">Log In</h1>
        <form onSubmit={handleSubmit} className="mt-5 w-full">
          <div className="my-3">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="border p-3 rounded-md  w-full focus:outline-none "
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-3">
            <input
              type="password"
              id="password"
              placeholder="New password"
              className="border p-3 rounded-md  w-full focus:outline-none "
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center py-5">
            <button
              disabled={loading}
              className="w-50 bg-blue-600 text-white py-2 px-7 w-full min-w-min rounded-lg text-center hover:bg-blue-700 transition duration-500 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Log In"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center p-3">{error}</p>
            )}
          </div>
        </form>
        <Link to="/sign-up">
          <button className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-500 disabled:opacity-80">
            Create new account
          </button>
        </Link>
      </div>
    </div>
  );
}

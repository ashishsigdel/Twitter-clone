import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoEarth } from "react-icons/io5";

export default function SignUp() {
  const [formData, setFormData] = useState({
    gender: "other",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(formData);
  const handleChange = (e) => {
    if (
      e.target.id === "female" ||
      e.target.id === "male" ||
      e.target.id === "other"
    ) {
      setFormData({
        ...formData,
        gender: e.target.id,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="m-2">
      <div className="text-center my-5">
        <h1 className="flex items-center justify-center text-blue-700 text-3xl font-bold">
          Soci{""}
          <span>
            <IoEarth />
          </span>
          Sphere
        </h1>
      </div>
      <div className="bg-white max-w-md mx-auto p-3 sm:p-5 flex flex-col items-center m-5 shadow-lg rounded-lg">
        <h1 className="font-bold text-xl pt-3">Create a new account</h1>
        <p className="text-slate-500 text-sm pb-3">It's quick and easy.</p>
        <form onSubmit={handleSubmit} className="mt-5 w-full">
          <div className="flex justify-between gap-2">
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
          <div>
            <p className="text-sm text-slate-600">
              By clicking Sign Up, you agree our{" "}
              <Link to="/terms">
                <span className="text-blue-900 underline cursor-pointer">
                  Terms and condition
                </span>
              </Link>
              .
            </p>
          </div>
          <div className="text-center py-5">
            <button
              disabled={loading}
              className="w-50 bg-green-600 text-white py-1 px-7 min-w-min rounded-lg text-center hover:bg-green-700 transition duration-500 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            {error && <p className="text-sm text-red-500 my-3">{error}</p>}
          </div>
        </form>
        <Link to="/sign-in">
          <p className="text-blue-500 cursor-pointer">
            Already have an account ?
          </p>
        </Link>
      </div>
    </div>
  );
}

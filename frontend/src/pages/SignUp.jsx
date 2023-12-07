import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="m-2">
      <div className="text-center my-5">
        <h1 className="text-blue-700 text-3xl font-bold">SocioSphere</h1>
      </div>
      <div className="bg-white max-w-md mx-auto p-3 flex flex-col items-center m-5 shadow-lg rounded-lg">
        <h1 className="font-bold text-xl pt-3">Create a new account</h1>
        <p className="text-slate-500 text-sm pb-3">It's quick and easy.</p>
        <form className="mt-5 w-full">
          <div className="flex justify-between gap-2">
            <input
              type="text"
              id="firstName"
              className="border p-1 rounded-md w-44 focus:outline-none"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              id="lastName"
              className="border p-1 rounded-md w-44 focus:outline-none si"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="my-3">
            <input
              type="email"
              placeholder="Email"
              className="border p-1 rounded-md  w-full focus:outline-none si"
            />
          </div>
          <div className="my-3">
            <input
              type="password"
              placeholder="New password"
              className="border p-1 rounded-md  w-full focus:outline-none si"
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
                className="border p-1 rounded-md w-32 focus:outline-none si"
                placeholder="Day"
                required
              />
              <input
                type="number"
                min={1}
                max={31}
                id="month"
                className="border p-1 rounded-md w-32 focus:outline-none si"
                placeholder="Month"
                required
              />
              <input
                type="number"
                id="year"
                min={1900}
                className="border p-1 rounded-md w-32 focus:outline-none si"
                placeholder="Year"
                required
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
                />
                <span>Female</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="male"
                  className="border p-1 rounded-md focus:outline-none scale-125"
                />
                <span>Male</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="other"
                  className="border p-1 rounded-md focus:outline-none scale-125"
                />
                <span>Other</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-600">
              By clicking Sign Up, you agree our{" "}
              <span className="text-blue-900 underline cursor-pointer">
                Terms and condition
              </span>
              .
            </p>
          </div>
          <div className="text-center py-5">
            <button className="w-50 bg-green-600 text-white py-1 px-7 min-w-min rounded-lg text-center hover:bg-green-700 transition duration-500">
              Sign Up
            </button>
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

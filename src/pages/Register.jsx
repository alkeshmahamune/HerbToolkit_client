import React, { useState } from "react";
import iPhone from "../assets/jpgIphone.png";
import {
  User,
  Lock,
  AtSign,
  Image,
  Calendar,
  VenusAndMars,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [trackResponse, setTrackResponse] = useState(false);
  const [role, setRole] = useState("");

  const handleContinue = () => {
    if (!role) {
      toast.error("Please select a role");
      return;
    }
    console.log("Selected Role:", role);
    setTrackResponse(true);
  };
  const SignIn = () => {
    toast.success("sign in ");
  };
  return !trackResponse ? (
    <>
      <div className="w-full relative opacity-50 h-svh flex justify-between">
        <div className="w-[60%] bg-blue-500 flex justify-center items-center">
          <img src={iPhone} alt="" className="w-1/3" />
        </div>
        <div className="w-[35%] h-full flex flex-col justify-center">
          <form className="w-[85%] p-3 box-border rounded-md flex flex-col gap-8">
            <h1 className="text-start text-4xl font-bold text-blue-500 poppins-bold">
              Register Yourself
            </h1>
            <div className="w-[90%] border-2 border-gray-300  rounded-md flex justify-start items-center">
              <User className="border-r border-gray-300 px-2" size={40} />
              <input
                type="text"
                placeholder="Enter Email/Mobile No."
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
            <div className="w-[90%] border-2 border-gray-300  rounded-md flex justify-start items-center">
              <User className="border-r border-gray-300 px-2" size={40} />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
            <div className="w-[90%] flex justify-between">
              <span className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="passSuggester"
                  id=""
                  className="h-4 w-4"
                />
                Remember Me
              </span>
              <p className="text-blue-400 underline cursor-pointer">
                Forgot Password
              </p>
            </div>
            <button
              type="button"
              className="w-1/3 cursor-pointer py-2 rounded-md poppins-semibold text-white bg-blue-500"
              onClick={SignIn}
            >
              Sign In
            </button>
            <hr />
            <p className="text-center">
              don't have account?{" "}
              <span
                className="text-blue-500 cursor-pointer underline"
                onClick={() => navigate("/register")}
              >
                Register Now
              </span>
            </p>
          </form>
        </div>
      </div>
      <div
        className="min-h-screen w-1/4 absolute top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2 flex items-center justify-center "
      >
        <div className="w-full  bg-white border border-black/10 shadow-2xl rounded-2xl p-8">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-black text-center mb-6">
            Register As
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {["User", "Influencer", "Doctor"].map((item) => (
              <button
                key={item}
                onClick={() => setRole(item)}
                className={`w-full cursor-pointer py-3 rounded-xl border transition-all duration-300 font-medium
                ${
                  role === item
                    ? "bg-black text-white border-black scale-105"
                    : "bg-gray-50 text-black border-gray-300 hover:bg-black hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full cursor-pointer mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  ) : (
    <form className="w-[80%] mx-auto h-svh flex justify-center items-center">
      <div className="w-full shadow-2xl p-5 rounded-xl  box-border flex flex-wrap gap-8">
        <div className="w-full">
          <h1 className="text-start text-4xl font-bold text-blue-500 poppins-bold">
            Register Yourself
          </h1>
        </div>
        <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
          <User className="border-r border-gray-300 px-2" size={40} />
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full poppins outline-0 p-2 box-border"
          />
        </div>
        <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
          <Lock className="border-r border-gray-300 px-2" size={40} />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full poppins outline-0 p-2 box-border"
          />
        </div>
        <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
          <AtSign className="border-r border-gray-300 px-2" size={40} />
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full poppins outline-0 p-2 box-border"
          />
        </div>
        <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
          <Image className="border-r border-gray-300 px-2" size={40} />
          <input
            type="file"
            className="w-full poppins outline-0 p-2 box-border"
          />
        </div>
        <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
          <Calendar className="border-r border-gray-300 px-2" size={40} />
          <input
            type="date"
            className="w-full poppins outline-0 p-2 box-border"
          />
        </div>
        <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
          <VenusAndMars className="border-r border-gray-300 px-2" size={40} />
          <select name="gender" id="" className="w-full h-full outline-0">
            <option value="male" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {role === "User" ? (
          <>
            <div className="w-1/4 flex flex-col gap-3 justify-between items-start">
            <label className="poppins-medium">Dietry Preference</label>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="food-pref"
                value={"Veg"}
                className="w-4 h-4 cursor-pointer"
              />{" "}
              <span className="poppins px-1">Veg</span>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="food-pref"
                value={"NonVeg"}
                className="w-4 h-4 cursor-pointer"
              />{" "}
              <span className="poppins px-1"> Non-Veg</span>
            </div>{" "}
            <div className="flex justify-center items-center">
                      <input type="radio" name="food-pref" value={"Mix"} className="w-4 h-4 cursor-pointer"/> <span className="poppins px-1">Mix</span>
                    </div>
          </div>
          <div className="w-1/4 flex flex-col gap-3 justify-between items-start">
            <label className="poppins-medium">Health Goal</label>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="goal"
                value={"WLoss"}
                className="w-4 h-4 cursor-pointer"
              />{" "}
              <span className="poppins px-1">Weight Loss</span>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="goal"
                value={"wGain"}
                className="w-4 h-4 cursor-pointer"
              />{" "}
              <span className="poppins px-1"> Weight Gain</span>
            </div>{" "}
            <div className="flex justify-center items-center">
                      <input type="radio" name="goal" value={"fitness"} className="w-4 h-4 cursor-pointer"/> <span className="poppins px-1">Fitne</span>
                    </div>
          </div>
          </>
        ) : null}
      </div>
    </form>
  );
};

export default Register;

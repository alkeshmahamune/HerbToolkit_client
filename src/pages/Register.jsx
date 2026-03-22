import React, { useState } from "react";
import iPhone from "../assets/jpgIphone.png";
import {
  User,
  Lock,
  AtSign,
  Image,
  Calendar,
  VenusAndMars,
  Weight,
  Instagram,
  Youtube,
  ChartColumnStacked,
  Stethoscope,
  LetterText,
  Hospital,
  IndianRupee,
  TimerIcon,
  Phone,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [trackResponse, setTrackResponse] = useState(false);
  const [role, setRole] = useState("");
  const [closePopUp, setClosePopUp] = useState(false);

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
      <div
        className={`w-full relative ${!closePopUp ? "opacity-50" : "opacity-100"}  h-svh flex justify-between`}
      >
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
            <button className="w-1/3 cursor-pointer py-2 rounded-md poppins-semibold text-white bg-blue-500">
              Sign In
            </button>
            <hr />
            <p className="text-center">
              Already have account?{" "}
              <span
                className="text-blue-500 cursor-pointer underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
      <div
        className={`min-h-screen w-1/4 absolute top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2 ${!closePopUp ? "flex" : "hidden"}  items-center justify-center `}
      >
        <div className="w-full relative  bg-white border border-black/10 shadow-2xl rounded-2xl p-8">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-black text-center mb-6">
            Register As
          </h2>
          <X
            className="absolute right-5 cursor-pointer top-4"
            onClick={() => setClosePopUp(!closePopUp)}
          />
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
            type="email"
            placeholder="Enter Your Email"
            className="w-full poppins outline-0 p-2 box-border"
          />
        </div>
        <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
          <Phone className="border-r border-gray-300 px-2" size={40} />
          <input
            type="tel"
            placeholder="Enter Your Mobile No."
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
        <div className="w-1/4 border-2 h-12 border-gray-300 rounded-md flex items-center px-2 gap-3">
          {/* Icon */}
          <VenusAndMars className="border-r border-gray-300 pr-2" size={30} />

          {/* Radio Options */}
          <div className="flex items-center gap-4 pl-2">
            <label className="flex items-center gap-1 cursor-pointer text-sm">
              <input
                type="radio"
                name="gender"
                value="male"
                className="accent-teal-600"
              />
              Male
            </label>

            <label className="flex items-center gap-1 cursor-pointer text-sm">
              <input
                type="radio"
                name="gender"
                value="female"
                className="accent-teal-600"
              />
              Female
            </label>
          </div>
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
                <input
                  type="radio"
                  name="food-pref"
                  value={"Mix"}
                  className="w-4 h-4 cursor-pointer"
                />{" "}
                <span className="poppins px-1">Mix</span>
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
                <input
                  type="radio"
                  name="goal"
                  value={"fitness"}
                  className="w-4 h-4 cursor-pointer"
                />{" "}
                <span className="poppins px-1">Fitness</span>
              </div>
            </div>
          </>
        ) : role === "Influencer" ? (
          <>
            <div className="w-1/4 flex flex-col gap-3 justify-between items-start">
              <label className="poppins-medium">Niche</label>
              <div className="w-full flex flex-wrap gap-3">
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name="niche"
                    value={"fitness"}
                    className="w-4 h-4 cursor-pointer"
                  />{" "}
                  <span className="poppins px-1">Fitness </span>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name="niche"
                    value={"cooking"}
                    className="w-4 h-4 cursor-pointer"
                  />{" "}
                  <span className="poppins px-1"> Cooking Gain</span>
                </div>{" "}
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name="niche"
                    value={"health"}
                    className="w-4 h-4 cursor-pointer"
                  />{" "}
                  <span className="poppins px-1">Health</span>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name="niche"
                    value={"lifestyle"}
                    className="w-4 h-4 cursor-pointer"
                  />{" "}
                  <span className="poppins px-1">Lifestyle</span>
                </div>
              </div>
            </div>
            <div className="w-1/4 flex flex-col gap-3 justify-start items-start">
              <label className="poppins-medium">Collaboration Type</label>
              <div className="w-full flex items-start flex-wrap gap-3">
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name="collab"
                    value={"paid"}
                    className="w-4 h-4 cursor-pointer"
                  />{" "}
                  <span className="poppins px-1"> Paid</span>
                </div>{" "}
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name="collab"
                    value={"affiliated"}
                    className="w-4 h-4 cursor-pointer"
                  />{" "}
                  <span className="poppins px-1">affiliated</span>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name="collab"
                    value={"promotion"}
                    className="w-4 h-4 cursor-pointer"
                  />{" "}
                  <span className="poppins px-1">Promotion</span>
                </div>
              </div>
            </div>
            <div className="w-1/4 h-11 border-2 border-gray-300  rounded-md flex justify-start items-center">
              <Instagram className="border-r border-gray-300 px-2" size={40} />
              <input
                type="text"
                placeholder="Instagram Handle"
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
            <div className="w-1/4 h-11 border-2 border-gray-300  rounded-md flex justify-start items-center">
              <Youtube className="border-r border-gray-300 px-2" size={40} />
              <input
                type="text"
                placeholder="Youtube Channel Link"
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
            <div className="w-1/4 h-11 border-2 border-gray-300  rounded-md flex justify-start items-center">
              <ChartColumnStacked
                className="border-r border-gray-300 px-2"
                size={40}
              />
              <input
                type="tel"
                regex={"^[0-9]+$"}
                placeholder="Followers Count"
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
              <Stethoscope
                className="border-r border-gray-300 px-2"
                size={40}
              />
              <select
                name="designation"
                id=""
                className="w-full h-full outline-0"
              >
                <option value="male" disabled selected>
                  Select Designation
                </option>
                <option value="mbbs">MBBS</option>
                <option value="md">MD</option>
                <option value="ms">MS</option>
                <option value="bams">BAMS</option>
                <option value="bhms">BHMS</option>
                <option value="bds">BDS</option>
                <option value="mch">MCh</option>
                <option value="dm">DM</option>
                <option value="nutritionist">Nutritionist</option>
                <option value="dietitian">Dietitian</option>
                <option value="physician">Physician</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="gynecologist">Gynecologist</option>
                <option value="orthopedic">Orthopedic</option>
                <option value="pediatrician">Pediatrician</option>
                <option value="psychiatrist">Psychiatrist</option>
              </select>
            </div>
            <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
              <Stethoscope
                className="border-r border-gray-300 px-2"
                size={40}
              />
              <input
                type="text"
                placeholder="Enter Specialization"
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
            <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
              <TimerIcon className="border-r border-gray-300 px-2" size={40} />
              <input
                type="number"
                placeholder="Enter Years Of Experience"
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
            <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
              <LetterText className="border-r border-gray-300 px-2" size={40} />
              <input
                type="text"
                placeholder="Enter Registration Number"
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
            <div className="w-1/4 border-2 border-gray-300  rounded-md flex justify-start items-center">
              <Hospital className="border-r border-gray-300 px-2" size={40} />
              <input
                type="text"
                placeholder="Enter Hospital/Clinic Name"
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
            <div className="w-1/4 h-11 border-2 border-gray-300  rounded-md flex justify-start items-center">
              <IndianRupee
                className="border-r border-gray-300 px-2"
                size={40}
              />
              <input
                type="text"
                placeholder="Enter Consultation Fees"
                className="w-full poppins outline-0 p-2 box-border"
              />
            </div>
            <div className="w-1/4">
              <div className="w-full border-2 border-gray-300  rounded-md flex justify-start items-center">
                <Image className="border-r border-gray-300 px-2" size={40} />
                <input
                  type="file"
                  className="w-full poppins outline-0 p-2 box-border"
                />
              </div>
              Note:Upload medical ceritficate
            </div>
          </>
        )}
        <div className="w-full">
          <button className="font-semibold poppins text-white bg-blue-500 py-2 px-3 rounded-md cursor-pointer">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;

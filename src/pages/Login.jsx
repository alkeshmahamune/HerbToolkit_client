import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AtSign, Lock, Stethoscope, Eye, EyeOff, ChevronRight, User, Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import iPhone from "../assets/jpgIphone.png";
import { useLocation } from "react-router-dom";
import axios from "axios";

const inputCls =
  "w-full px-3 py-2.5 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400 rounded-r-xl";

const Field = ({ icon: Icon, error, children }) => (
  <div className="flex flex-col gap-1">
    <div
      className={`flex items-center rounded-xl border bg-white transition-all duration-200
        ${error
          ? "border-red-400 ring-1 ring-red-300"
          : "border-gray-200 focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-200"
        }`}
    >
      <span className="flex items-center justify-center w-11 h-11 shrink-0 text-gray-400 border-r border-gray-200">
        <Icon size={18} />
      </span>
      {children}
    </div>
    {error && <p className="text-xs text-red-500 pl-1">{error.message}</p>}
  </div>
);

const ROLES = [
  {
    id: "user",
    label: "User",
    description: "Track nutrition & health",
    icon: User,
  },
  {
    id: "doctor",
    label: "Doctor",
    description: "Consult & manage patients",
    icon: Stethoscope,
  },
  {
    id: "influencer",
    label: "Influencer",
    description: "Share health content",
    icon: Users,
  },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-select role if passed via navigate state
  const [selectedRole, setSelectedRole] = useState(location.state?.role || null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const API_MAP = {
    user:       { url: "http://localhost:3000/api/user/login",       tokenKey: "userToken",       redirect: "/user-home"       },
    doctor:     { url: "http://localhost:3000/api/doctor/login",     tokenKey: "doctorToken",     redirect: "/doctor-home"     },
    influencer: { url: "http://localhost:3000/api/influencer/login", tokenKey: "influencerToken", redirect: "/influencer-home" },
  };

  const onSubmit = async (data) => {
    if (!selectedRole) {
      toast.error("Please select a role first");
      return;
    }

    try {
      const { url, tokenKey, redirect } = API_MAP[selectedRole];
      const response = await axios.post(url, data);

      if (response.data?.success) {
        toast.success(response.data.message);
        localStorage.setItem(tokenKey, response.data?.token);
        setTimeout(() => navigate(redirect), 1500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full h-svh flex">
      {/* ── LEFT PANEL ── */}
      <div className="hidden md:flex w-[55%] bg-linear-to-br from-teal-600 to-teal-400 flex-col items-center justify-center relative overflow-hidden p-12">
        <div className="absolute w-96 h-96 rounded-full bg-white/5 -top-20 -left-20" />
        <div className="absolute w-72 h-72 rounded-full bg-white/5 bottom-10 right-0" />
        <div className="absolute w-48 h-48 rounded-full bg-white/5 top-1/2 left-1/4" />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <img src={iPhone} alt="App Preview" className="w-44 drop-shadow-2xl" />
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold tracking-tight">
              Your Health, Simplified
            </h2>
            <p className="text-white/70 text-sm mt-2 max-w-xs leading-relaxed">
              Track nutrition, consult doctors, and connect with health
              influencers — all in one place.
            </p>
          </div>
          <div className="flex gap-6 mt-2">
            {[["10K+", "Doctors"], ["500K+", "Users"], ["4.9★", "Rating"]].map(
              ([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-white font-bold text-lg leading-none">{val}</p>
                  <p className="text-white/60 text-xs mt-0.5">{label}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 bg-linear-to-br from-slate-50 via-teal-50/30 to-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* brand */}
          <div className="flex items-center gap-2 mb-8">
            <span className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center">
              <Stethoscope size={16} className="text-white" />
            </span>
            <span className="font-bold text-gray-800 text-sm tracking-tight">
              HerbToolkit
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account to continue</p>

          {/* ── ROLE SELECTOR ── */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Login as
          </p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {ROLES.map(({ id, label, description, icon: Icon }) => {
              const isSelected = selectedRole === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedRole(id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all duration-200
                    ${isSelected
                      ? "border-teal-400 bg-teal-50 ring-1 ring-teal-200"
                      : "border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50"
                    }`}
                >
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center
                      ${isSelected ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-500"}`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className={`text-xs font-semibold ${isSelected ? "text-teal-600" : "text-gray-700"}`}>
                    {label}
                  </span>
                  <span className="text-[10px] text-gray-400 leading-tight">{description}</span>
                </button>
              );
            })}
          </div>

          {/* ── LOGIN FORM ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Field icon={AtSign} error={errors.identifier}>
              <input
                {...register("identifier", {
                  required: "Email or mobile number is required",
                })}
                type="text"
                placeholder="Email / Mobile Number"
                className={inputCls}
              />
            </Field>

            <Field icon={Lock} error={errors.password}>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="pr-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </Field>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="w-4 h-4 accent-teal-500 rounded"
                />
                Remember me
              </label>
              <span className="text-teal-500 hover:underline cursor-pointer font-medium">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedRole}
              className="w-full mt-2 bg-teal-500 hover:bg-teal-600 active:scale-[0.98] disabled:opacity-60
                text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Sign In <ChevronRight size={16} />
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <span
              className="text-teal-500 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Lock,
  AtSign,
  Image,
  Calendar,
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
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Salad,
  Target,
  Sparkles,
  UserRound,
  Pill,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

/* ─── tiny reusable field wrapper ─── */
const Field = ({ icon: Icon, children, error }) => (
  <div className="flex flex-col gap-1 w-full">
    <div
      className={`flex items-center gap-0 rounded-xl border bg-white transition-all duration-200
        ${error ? "border-red-400 ring-1 ring-red-300" : "border-gray-200 focus-within:border-teal-400 focus-within:ring-1 focus-within:ring-teal-200"}`}
    >
      <span className="flex items-center justify-center w-11 h-11 shrink-0 text-gray-400 border-r border-gray-200">
        <Icon size={18} />
      </span>
      {children}
    </div>
    {error && <p className="text-xs text-red-500 pl-1">{error.message}</p>}
  </div>
);

const inputCls =
  "w-full px-3 py-2.5 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400 rounded-r-xl";

/* ─── role card ─── */
const RoleCard = ({
  value,
  label,
  icon: Icon,
  description,
  selected,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 group
      ${
        selected
          ? "border-teal-500 bg-teal-50 shadow-md shadow-teal-100"
          : "border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/40"
      }`}
  >
    <span
      className={`mt-0.5 p-2 rounded-xl transition-colors ${selected ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-teal-100 group-hover:text-teal-500"}`}
    >
      <Icon size={20} />
    </span>
    <span>
      <span
        className={`font-semibold text-sm block ${selected ? "text-teal-700" : "text-gray-800"}`}
      >
        {label}
      </span>
      <span className="text-xs text-gray-500 mt-0.5 block">{description}</span>
    </span>
    {selected && (
      <CheckCircle2
        size={18}
        className="ml-auto mt-0.5 text-teal-500 shrink-0"
      />
    )}
  </button>
);

/* ─── step indicator ─── */
const Steps = ({ steps, current }) => (
  <div className="flex items-center gap-2 mb-8">
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
            ${i < current ? "bg-teal-500 text-white" : i === current ? "bg-teal-500 text-white ring-4 ring-teal-100" : "bg-gray-100 text-gray-400"}`}
          >
            {i < current ? <CheckCircle2 size={14} /> : i + 1}
          </span>
          <span
            className={`text-xs font-medium hidden sm:block ${i === current ? "text-teal-600" : "text-gray-400"}`}
          >
            {s}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div
            className={`flex-1 h-0.5 rounded ${i < current ? "bg-teal-400" : "bg-gray-200"}`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ─── radio group ─── */
const RadioGroup = ({ label, name, options, register, error, required }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer text-sm text-gray-700
            has-checked:border-teal-400 has-checked:bg-teal-50 has-checked:text-teal-700 transition-all"
        >
          <input
            type="radio"
            value={opt.value}
            {...register(name, { required })}
            className="accent-teal-500 w-3.5 h-3.5"
          />
          {opt.label}
        </label>
      ))}
    </div>
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0 = role, 1 = account, 2 = profile
  const [role, setRole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm({ mode: "onTouched" });

  /* ── step 0: pick role ── */
  const handleRoleNext = () => {
    if (!role) {
      toast.error("Please select a role to continue");
      return;
    }
    setStep(1);
  };

  /* ── step 1: account fields ── */
  const handleAccountNext = async () => {
    const ok = await trigger(["fullName", "email", "password", "phone"]);
    if (ok) setStep(2);
  };

  /* ── final submit ── */
  const onSubmit = async (data) => {
    console.log(data);
    let response;
    try {
      if (role.toLocaleLowerCase() === "user") {
        response = await axios.post("http://localhost:3000/api/user/register", {
          role,
          ...data,
        });
      } else if (role.toLocaleLowerCase() === "doctor") {
        response = await axios.post(
          "http://localhost:3000/api/doctor/register",
          { role, ...data },
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/api/influencer/register",
          {
            role,
            ...data,
          },
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    if (response.data.success) {
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      toast.warn(response.data.message);
    }
    console.log({ role, ...data });
  };

  const roles = [
    {
      value: "User",
      label: "User",
      icon: UserRound,
      description: "Track health, discover diets & fitness plans",
    },
    {
      value: "Influencer",
      label: "Influencer",
      icon: Sparkles,
      description: "Collaborate, grow & monetise your audience",
    },
    {
      value: "Doctor",
      label: "Doctor",
      icon: Pill,
      description: "Consult patients & share medical expertise",
    },
  ];

  const steps = ["Choose Role", "Account", "Profile"];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/30 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-teal-100/60 border border-gray-100 p-8">
          {/* logo / brand */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center">
              <Stethoscope size={16} className="text-white" />
            </span>
            <span className="font-bold text-gray-800 text-sm tracking-tight">
              HealthHub
            </span>
          </div>

          <Steps steps={steps} current={step} />

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ── STEP 0: ROLE ── */}
            {step === 0 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Join as</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Pick the role that best describes you
                  </p>
                </div>
                {roles.map((r) => (
                  <RoleCard
                    key={r.value}
                    {...r}
                    selected={role === r.value}
                    onClick={() => setRole(r.value)}
                  />
                ))}
                <button
                  type="button"
                  onClick={handleRoleNext}
                  className="w-full mt-2 bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  Continue <ChevronRight size={16} />
                </button>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Already have an account?{" "}
                  <span
                    className="text-teal-500 font-medium cursor-pointer hover:underline"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            )}

            {/* ── STEP 1: ACCOUNT ── */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Create account
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Your login credentials
                  </p>
                </div>

                <Field icon={User} error={errors.fullName}>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    placeholder="Full Name"
                    className={inputCls}
                  />
                </Field>

                <Field icon={AtSign} error={errors.email}>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                    type="email"
                    placeholder="Email Address"
                    className={inputCls}
                  />
                </Field>

                <Field icon={Phone} error={errors.phone}>
                  <input
                    {...register("phone", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter valid 10-digit number",
                      },
                    })}
                    type="tel"
                    placeholder="Mobile Number"
                    className={inputCls}
                  />
                </Field>

                <Field icon={Lock} error={errors.password}>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                    type="password"
                    placeholder="Password"
                    className={inputCls}
                  />
                </Field>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleAccountNext}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: PROFILE (role-specific) ── */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Profile details
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Tell us a little about yourself
                  </p>
                </div>

                {/* Common fields for all roles */}
                <div className="grid grid-cols-2 gap-4">
                  <Field icon={Calendar} error={errors.dob}>
                    <input
                      {...register("dob", {
                        required: "Date of birth required",
                      })}
                      type="date"
                      className={inputCls}
                    />
                  </Field>
                  <Field icon={Image} error={errors.avatar}>
                    <input
                      {...register("avatar")}
                      type="file"
                      accept="image/*"
                      className={`${inputCls} text-xs`}
                    />
                  </Field>
                </div>

                {/* Gender */}
                <RadioGroup
                  label="Gender"
                  name="gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  register={register}
                  error={errors.gender}
                  required="Gender is required"
                />

                {/* ── USER specific ── */}
                {role === "User" && (
                  <div className="space-y-5 pt-1 border-t border-dashed border-gray-200">
                    <p className="text-xs font-semibold text-teal-500 uppercase tracking-widest pt-2">
                      Health Details
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <Field icon={Weight} error={errors.weight}>
                        <input
                          {...register("weight", {
                            required: "Weight required",
                          })}
                          type="number"
                          placeholder="Weight (kg)"
                          className={inputCls}
                        />
                      </Field>
                      <Field icon={User} error={errors.height}>
                        <input
                          {...register("height")}
                          type="number"
                          placeholder="Height (cm)"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <RadioGroup
                      label="Dietary Preference"
                      name="dietPref"
                      options={[
                        { value: "Veg", label: "🥗 Veg" },
                        { value: "NonVeg", label: "🍗 Non-Veg" },
                        { value: "Mix", label: "🍱 Mix" },
                      ]}
                      register={register}
                      error={errors.dietPref}
                      required="Please select a preference"
                    />
                    <RadioGroup
                      label="Health Goal"
                      name="healthGoal"
                      options={[
                        { value: "WLoss", label: "⬇️ Weight Loss" },
                        { value: "WGain", label: "⬆️ Weight Gain" },
                        { value: "fitness", label: "💪 Fitness" },
                      ]}
                      register={register}
                      error={errors.healthGoal}
                      required="Please select a goal"
                    />
                  </div>
                )}

                {/* ── INFLUENCER specific ── */}
                {role === "Influencer" && (
                  <div className="space-y-5 pt-1 border-t border-dashed border-gray-200">
                    <p className="text-xs font-semibold text-teal-500 uppercase tracking-widest pt-2">
                      Creator Details
                    </p>

                    <RadioGroup
                      label="Niche"
                      name="niche"
                      options={[
                        { value: "fitness", label: "💪 Fitness" },
                        { value: "cooking", label: "🍳 Cooking" },
                        { value: "health", label: "❤️ Health" },
                        { value: "lifestyle", label: "✨ Lifestyle" },
                      ]}
                      register={register}
                      error={errors.niche}
                      required="Select a niche"
                    />
                    <RadioGroup
                      label="Collaboration Type"
                      name="collab"
                      options={[
                        { value: "paid", label: "💰 Paid" },
                        { value: "affiliated", label: "🔗 Affiliated" },
                        { value: "promotion", label: "📣 Promotion" },
                      ]}
                      register={register}
                      error={errors.collab}
                      required="Select collaboration type"
                    />

                    <Field icon={Instagram} error={errors.instagram}>
                      <input
                        {...register("instagram")}
                        type="text"
                        placeholder="Instagram Handle"
                        className={inputCls}
                      />
                    </Field>
                    <Field icon={Youtube} error={errors.youtube}>
                      <input
                        {...register("youtube")}
                        type="text"
                        placeholder="YouTube Channel Link"
                        className={inputCls}
                      />
                    </Field>
                    <Field icon={ChartColumnStacked} error={errors.followers}>
                      <input
                        {...register("followers", {
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Numbers only",
                          },
                        })}
                        type="text"
                        placeholder="Followers Count"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                )}

                {/* ── DOCTOR specific ── */}
                {role === "Doctor" && (
                  <div className="space-y-4 pt-1 border-t border-dashed border-gray-200">
                    <p className="text-xs font-semibold text-teal-500 uppercase tracking-widest pt-2">
                      Medical Details
                    </p>

                    <Field icon={Stethoscope} error={errors.designation}>
                      <select
                        {...register("designation", {
                          required: "Select a designation",
                        })}
                        className={`${inputCls} cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select Designation
                        </option>
                        {[
                          "MBBS",
                          "MD",
                          "MS",
                          "BAMS",
                          "BHMS",
                          "BDS",
                          "MCh",
                          "DM",
                          "Nutritionist",
                          "Dietitian",
                          "Physician",
                          "Cardiologist",
                          "Dermatologist",
                          "Gynecologist",
                          "Orthopedic",
                          "Pediatrician",
                          "Psychiatrist",
                        ].map((d) => (
                          <option key={d} value={d.toLowerCase()}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field icon={Stethoscope} error={errors.specialization}>
                      <input
                        {...register("specialization", {
                          required: "Specialization required",
                        })}
                        type="text"
                        placeholder="Specialization"
                        className={inputCls}
                      />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field icon={TimerIcon} error={errors.experience}>
                        <input
                          {...register("experience", { required: "Required" })}
                          type="number"
                          placeholder="Years of Experience"
                          className={inputCls}
                        />
                      </Field>
                      <Field icon={IndianRupee} error={errors.fees}>
                        <input
                          {...register("fees", { required: "Required" })}
                          type="text"
                          placeholder="Consultation Fees"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <Field icon={LetterText} error={errors.regNo}>
                      <input
                        {...register("regNo", {
                          required: "Registration number required",
                        })}
                        type="text"
                        placeholder="Medical Registration Number"
                        className={inputCls}
                      />
                    </Field>

                    <Field icon={Hospital} error={errors.hospital}>
                      <input
                        {...register("hospital")}
                        type="text"
                        placeholder="Hospital / Clinic Name"
                        className={inputCls}
                      />
                    </Field>

                    <div className="flex flex-col gap-1">
                      <Field icon={Image} error={errors.certificate}>
                        <input
                          {...register("certificate", {
                            required: "Certificate required",
                          })}
                          type="file"
                          accept="image/*,.pdf"
                          className={`${inputCls} text-xs`}
                        />
                      </Field>
                      <p className="text-xs text-gray-400 pl-1">
                        Upload medical certificate (image or PDF)
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-teal-500 hover:bg-teal-600 active:scale-[0.98] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    Register <CheckCircle2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* bottom note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          By registering you agree to our{" "}
          <span className="text-teal-400 cursor-pointer hover:underline">
            Terms of Service
          </span>{" "}
          &amp;{" "}
          <span className="text-teal-400 cursor-pointer hover:underline">
            Privacy Policy
          </span>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease both; }
      `}</style>
    </div>
  );
};

export default Register;

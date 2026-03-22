import React, { useState, useRef } from "react";
import {
  User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera,
  LogOut, Trash2, Shield, Bell, ChevronRight, Star, CheckCircle,
  Stethoscope, Award, BookOpen, Clock, Users, FileText,
  Building, Globe, Hash, Briefcase, GraduationCap, Activity
} from "lucide-react";

const COLORS = {
  red: "#ef4444", redDark: "#b91c1c", redLight: "#fee2e2",
  blue: "#3b82f6", blueDark: "#1d4ed8", blueLight: "#dbeafe",
  gray: "#6b7280", grayLight: "#f9fafb", border: "#e5e7eb",
  dark: "#111827", white: "#ffffff",
};

const InputField = ({ label, icon: Icon, value, name, type = "text", editable, onChange, options, span }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: span ? "1/-1" : undefined }}>
    <label style={{ fontSize: "12px", fontWeight: 700, color: COLORS.gray, textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {label}
    </label>
    <div style={{ position: "relative" }}>
      {Icon && <Icon size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: editable ? COLORS.blue : COLORS.gray }} />}
      {options ? (
        <select name={name} value={value} onChange={onChange} disabled={!editable} style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px", border: `1.5px solid ${editable ? COLORS.blue : COLORS.border}`, background: editable ? "#fff" : COLORS.grayLight, fontSize: "14px", color: COLORS.dark, outline: "none", appearance: "none", boxSizing: "border-box" }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} disabled={!editable} style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px", border: `1.5px solid ${editable ? COLORS.blue : COLORS.border}`, background: editable ? "#fff" : COLORS.grayLight, fontSize: "14px", color: COLORS.dark, outline: "none", boxSizing: "border-box" }} />
      )}
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon size={18} color={color} />
    </div>
    <p style={{ fontSize: typeof value === "string" && value.length > 8 ? "12px" : "22px", fontWeight: 800, color: COLORS.dark, fontFamily: "Georgia, serif", margin: 0, lineHeight: 1.3, wordBreak: "break-word" }}>{value}</p>
    <p style={{ fontSize: "12px", color: COLORS.gray, fontWeight: 600, margin: 0 }}>{label}</p>
  </div>
);

const Badge = ({ text, color }) => (
  <span style={{ display: "inline-block", background: color + "18", color: color, fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "99px", border: `1px solid ${color}30` }}>
    {text}
  </span>
);

export default function DoctorProfile() {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const [form, setForm] = useState({
    firstName: "Dr. Arjun", lastName: "Mehta",
    email: "dr.arjun.mehta@hospitalcare.in", phone: "+91 98811 22334",
    dob: "1980-09-22", gender: "Male",
    city: "Mumbai", state: "Maharashtra", pincode: "400001",
    registrationNo: "MCI-2005-MAH-00421",
    qualification: "MBBS, MD (Internal Medicine)", specialization: "Nutritional Medicine",
    experience: "18", hospital: "Apollo Hospitals, Mumbai",
    consultationFee: "1200", languages: "English, Hindi, Marathi",
    availableDays: "Mon–Fri", availableTime: "10:00 AM – 6:00 PM",
    website: "www.drarjunmehta.in",
    bio: "Senior consultant specialising in nutritional medicine and metabolic disorders. Passionate about food-as-medicine approaches.",
  });
  const [avatar, setAvatar] = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSave = () => { setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handleAvatar = e => { const f = e.target.files[0]; if (f) setAvatar(URL.createObjectURL(f)); };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "credentials", label: "Credentials", icon: Award },
    { id: "availability", label: "Availability", icon: Clock },
    { id: "patients", label: "Patients", icon: Users },
    { id: "settings", label: "Settings", icon: Shield },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4ff", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* banner — blue gradient for doctors */}
      <div style={{ height: "200px", background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 60%, #60a5fa 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "35%", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        {/* verified badge */}
        <div style={{ position: "absolute", top: "20px", left: "24px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "6px 14px", borderRadius: "99px", fontSize: "12px", fontWeight: 700, backdropFilter: "blur(8px)" }}>
          <CheckCircle size={13} /> Verified Doctor
        </div>
        <div style={{ position: "absolute", top: "20px", right: "24px", display: "flex", gap: "10px" }}>
          {!editing ? (
            <button onClick={() => setEditing(true)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600, backdropFilter: "blur(8px)" }}>
              <Edit3 size={14} /> Edit Profile
            </button>
          ) : (
            <>
              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "none", color: COLORS.blue, padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
                <Save size={14} /> Save
              </button>
              <button onClick={() => setEditing(false)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                <X size={14} /> Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
        {/* avatar + name */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", marginTop: "-64px", marginBottom: "28px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: "128px", height: "128px", borderRadius: "50%", border: "4px solid #fff", background: avatar ? "none" : "linear-gradient(135deg, #93c5fd, #1d4ed8)", overflow: "hidden", boxShadow: "0 8px 24px rgba(59,130,246,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {avatar ? <img src={avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Stethoscope size={48} color="#fff" />}
            </div>
            {editing && (
              <button onClick={() => fileRef.current.click()} style={{ position: "absolute", bottom: "4px", right: "4px", width: "32px", height: "32px", borderRadius: "50%", background: COLORS.blue, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Camera size={14} color="#fff" />
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} style={{ display: "none" }} />
          </div>
          <div style={{ paddingBottom: "12px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: COLORS.dark, fontFamily: "Georgia, serif", margin: 0 }}>
              {form.firstName} {form.lastName}
            </h1>
            <p style={{ color: COLORS.gray, fontSize: "14px", margin: "4px 0 6px" }}>{form.specialization} · {form.hospital}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Badge text={form.qualification} color={COLORS.blue} />
              <Badge text={`${form.experience} yrs exp`} color="#10b981" />
              <Badge text={`₹${form.consultationFee} / consult`} color={COLORS.red} />
            </div>
          </div>
          {saved && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", background: "#dcfce7", color: "#16a34a", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, marginBottom: "12px" }}>
              <CheckCircle size={16} /> Saved!
            </div>
          )}
        </div>

        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
          <StatCard icon={Stethoscope} label="Specialization" value={form.specialization.split(" ").slice(0,2).join(" ")} color={COLORS.blue} />
          <StatCard icon={Briefcase} label="Experience" value={`${form.experience} yrs`} color="#10b981" />
          <StatCard icon={Activity} label="Consult Fee" value={`₹${form.consultationFee}`} color={COLORS.red} />
          <StatCard icon={Globe} label="Languages" value={form.languages.split(",").length + " langs"} color="#f59e0b" />
        </div>

        {/* tabs */}
        <div style={{ display: "flex", gap: "4px", background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "4px", marginBottom: "24px", width: "fit-content" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, background: activeTab === t.id ? COLORS.blue : "transparent", color: activeTab === t.id ? "#fff" : COLORS.gray, transition: "all 0.2s" }}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {/* profile tab */}
        {activeTab === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><User size={16} color={COLORS.blue} /> Personal Details</h2>
              <InputField label="First Name" icon={User} name="firstName" value={form.firstName} editable={editing} onChange={handleChange} />
              <InputField label="Last Name" icon={User} name="lastName" value={form.lastName} editable={editing} onChange={handleChange} />
              <InputField label="Email" icon={Mail} name="email" value={form.email} editable={editing} onChange={handleChange} />
              <InputField label="Phone" icon={Phone} name="phone" value={form.phone} editable={editing} onChange={handleChange} />
              <InputField label="Date of Birth" icon={Calendar} name="dob" type="date" value={form.dob} editable={editing} onChange={handleChange} />
              <InputField label="Gender" icon={User} name="gender" value={form.gender} editable={editing} onChange={handleChange} options={["Male", "Female", "Non-binary", "Prefer not to say"]} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><MapPin size={16} color={COLORS.blue} /> Location</h2>
                <InputField label="City" icon={MapPin} name="city" value={form.city} editable={editing} onChange={handleChange} />
                <InputField label="State" icon={MapPin} name="state" value={form.state} editable={editing} onChange={handleChange} />
                <InputField label="PIN Code" icon={MapPin} name="pincode" value={form.pincode} editable={editing} onChange={handleChange} />
                <InputField label="Website" icon={Globe} name="website" value={form.website} editable={editing} onChange={handleChange} />
              </div>
              <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}><Edit3 size={16} color={COLORS.blue} /> Bio</h2>
                <textarea name="bio" value={form.bio} onChange={handleChange} disabled={!editing} rows={4} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: `1.5px solid ${editing ? COLORS.blue : COLORS.border}`, background: editing ? "#fff" : COLORS.grayLight, fontSize: "14px", color: COLORS.dark, resize: "none", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "credentials" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><GraduationCap size={16} color={COLORS.blue} /> Qualifications</h2>
              <InputField label="Qualification" icon={GraduationCap} name="qualification" value={form.qualification} editable={editing} onChange={handleChange} />
              <InputField label="Specialization" icon={Stethoscope} name="specialization" value={form.specialization} editable={editing} onChange={handleChange} options={["Nutritional Medicine", "General Medicine", "Cardiology", "Dermatology", "Endocrinology", "Gastroenterology"]} />
              <InputField label="Experience (years)" icon={Briefcase} name="experience" value={form.experience} editable={editing} onChange={handleChange} />
              <InputField label="MCI Registration No." icon={Hash} name="registrationNo" value={form.registrationNo} editable={editing} onChange={handleChange} />
            </div>
            <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><Building size={16} color={COLORS.blue} /> Practice Details</h2>
              <InputField label="Hospital / Clinic" icon={Building} name="hospital" value={form.hospital} editable={editing} onChange={handleChange} />
              <InputField label="Consultation Fee (₹)" icon={Activity} name="consultationFee" value={form.consultationFee} editable={editing} onChange={handleChange} />
              <InputField label="Languages Spoken" icon={Globe} name="languages" value={form.languages} editable={editing} onChange={handleChange} />
            </div>
          </div>
        )}

        {activeTab === "availability" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: "0 0 24px", display: "flex", alignItems: "center", gap: "8px" }}><Clock size={16} color={COLORS.blue} /> Consultation Schedule</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <InputField label="Available Days" icon={Calendar} name="availableDays" value={form.availableDays} editable={editing} onChange={handleChange} />
              <InputField label="Available Time" icon={Clock} name="availableTime" value={form.availableTime} editable={editing} onChange={handleChange} />
            </div>
            <div style={{ marginTop: "28px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: COLORS.gray, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Upcoming Appointments</p>
              {[
                { patient: "Sneha Patil", time: "Today, 11:00 AM", type: "Follow-up", status: "confirmed" },
                { patient: "Ravi Sharma", time: "Today, 2:30 PM", type: "New Consultation", status: "confirmed" },
                { patient: "Anjali Joshi", time: "Tomorrow, 10:00 AM", type: "Nutrition Review", status: "pending" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 16px", background: COLORS.grayLight, borderRadius: "10px", marginBottom: "10px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #93c5fd, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <User size={18} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: COLORS.dark }}>{a.patient}</p>
                    <p style={{ margin: 0, fontSize: "12px", color: COLORS.gray }}>{a.type} · {a.time}</p>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "99px", background: a.status === "confirmed" ? "#dcfce7" : "#fef9c3", color: a.status === "confirmed" ? "#16a34a" : "#ca8a04" }}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "patients" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: "0 0 20px", display: "flex", alignItems: "center", gap: "8px" }}><Users size={16} color={COLORS.blue} /> Recent Patients</h2>
            {[
              { name: "Sneha Patil", age: 32, concern: "Weight Management", lastVisit: "2 days ago", rating: 5 },
              { name: "Ravi Sharma", age: 45, concern: "Diabetes Diet", lastVisit: "1 week ago", rating: 5 },
              { name: "Anjali Joshi", age: 28, concern: "PCOS Nutrition", lastVisit: "2 weeks ago", rating: 4 },
              { name: "Kiran More", age: 55, concern: "Hypertension Diet", lastVisit: "3 weeks ago", rating: 5 },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `hsl(${i * 60 + 210}, 70%, 60%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "16px" }}>
                  {p.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: COLORS.dark }}>{p.name} <span style={{ fontWeight: 400, color: COLORS.gray, fontSize: "13px" }}>· {p.age} yrs</span></p>
                  <p style={{ margin: 0, fontSize: "12px", color: COLORS.gray }}>{p.concern}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "2px", justifyContent: "flex-end" }}>
                    {[...Array(5)].map((_, s) => <Star key={s} size={12} fill={s < p.rating ? "#f59e0b" : "none"} color="#f59e0b" />)}
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: "11px", color: COLORS.gray }}>{p.lastVisit}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {[
              { icon: Bell, label: "Notification Preferences", desc: "Appointment reminders and patient updates", color: COLORS.blue },
              { icon: Shield, label: "Privacy & Security", desc: "Manage password and 2FA", color: "#10b981" },
              { icon: FileText, label: "Documents & Certificates", desc: "Upload and manage credentials", color: "#f59e0b" },
              { icon: LogOut, label: "Sign Out", desc: "Sign out of your account", color: COLORS.gray },
              { icon: Trash2, label: "Delete Account", desc: "Permanently remove your account", color: COLORS.red },
            ].map((s, i) => (
              <button key={i} style={{ display: "flex", alignItems: "center", gap: "16px", background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "20px 24px", cursor: "pointer", textAlign: "left", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={18} color={s.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: i === 4 ? COLORS.red : COLORS.dark }}>{s.label}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: COLORS.gray }}>{s.desc}</p>
                </div>
                <ChevronRight size={18} color={COLORS.gray} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
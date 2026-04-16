import React, { useState, useRef, useEffect } from "react";
import {
  User, Mail, Phone, MapPin, Calendar, Heart, Weight,
  Ruler, Utensils, AlertCircle, Edit3, Save, X, Camera,
  LogOut, Trash2, Shield, Bell, ChevronRight, Star,
  BookOpen, Clock, TrendingUp, CheckCircle
} from "lucide-react";

const COLORS = {
  red: "#ef4444", redDark: "#b91c1c", redLight: "#fee2e2",
  blue: "#3b82f6", blueDark: "#1d4ed8", blueLight: "#dbeafe",
  gray: "#6b7280", grayLight: "#f9fafb", border: "#e5e7eb",
  dark: "#111827", white: "#ffffff",
};

const InputField = ({ label, icon: Icon, value, name, type = "text", editable, onChange, options }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    <label style={{ fontSize: "12px", fontWeight: 700, color: COLORS.gray, textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {label}
    </label>
    <div style={{ position: "relative" }}>
      {Icon && (
        <Icon size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: editable ? COLORS.red : COLORS.gray }} />
      )}
      {options ? (
        <select
          name={name} value={value} onChange={onChange} disabled={!editable}
          style={{
            width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px",
            border: `1.5px solid ${editable ? COLORS.red : COLORS.border}`,
            background: editable ? "#fff" : COLORS.grayLight, fontSize: "14px",
            color: COLORS.dark, outline: "none", cursor: editable ? "auto" : "default",
            appearance: "none",
          }}
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange} disabled={!editable}
          style={{
            width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px",
            border: `1.5px solid ${editable ? COLORS.red : COLORS.border}`,
            background: editable ? "#fff" : COLORS.grayLight, fontSize: "14px",
            color: COLORS.dark, outline: "none", boxSizing: "border-box",
          }}
        />
      )}
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div style={{
    background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "12px",
    padding: "16px", display: "flex", flexDirection: "column", gap: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  }}>
    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon size={18} color={color} />
    </div>
    <p style={{ fontSize: typeof value === "string" && value.length > 6 ? "14px" : "22px", fontWeight: 600, color: COLORS.dark, fontFamily: "sans-serif", lineHeight: 1.3, margin: 0 }}>{value}</p>
    <p style={{ fontSize: "12px", color: COLORS.gray, fontWeight: 600, margin: 0 }}>{label}</p>
  </div>
);

export default function UserProfile() {
  const currentUser=JSON.parse(localStorage.getItem('User'))
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();
  const rawDate=currentUser?.dob
  const date=new Date(rawDate)
  const Normalized =date.toISOString().split("T")[0]
  const [form, setForm] = useState({
    firstName: `${currentUser?.fullName}`, email: `${currentUser?.email}`,
    phone: `${currentUser?.phone}`, dob: `${Normalized}`, gender: `${currentUser?.gender}`,
    city: "Pune", state: "Maharashtra", pincode: "411001",
    weight: `${currentUser?.weight}`, height: `${currentUser?.weight}`, bloodGroup: "O+",
    dietType: `${currentUser?.dietPref}`, allergies: "Nuts, Dairy", healthGoal: `${currentUser?.healthGoal==="wloss"?"Weight Loss":"Weight Gain"}`,
    activityLevel: "Moderately Active", bio: "Food lover & home cook exploring healthy recipes.",
  });
  const [avatar, setAvatar] = useState(currentUser?.avatar || null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSave = () => { setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handleAvatar = e => { const f = e.target.files[0]; if (f) setAvatar(URL.createObjectURL(f)); };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "health", label: "Health", icon: Heart },
    { id: "activity", label: "Activity", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Shield },
  ];

    return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif",}}>
      {/* top banner */}
      <div style={{
        height: "200px", background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 50%, #7f1d1d 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "30%", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", top: "20px", right: "24px", display: "flex", gap: "10px" }}>
          {!editing ? (
            <button onClick={() => setEditing(true)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600, backdropFilter: "blur(8px)" }}>
              <Edit3 size={14} /> Edit Profile
            </button>
          ) : (
            <>
              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "none", color: COLORS.red, padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
                <Save size={14} /> Save
              </button>
              <button onClick={() => setEditing(false)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                <X size={14} /> Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
        {/* avatar + name row */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", marginTop: "-64px", marginBottom: "32px" }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: "128px", height: "128px", borderRadius: "50%", border: "4px solid #fff",
              background: avatar ? "none" : "linear-gradient(135deg, #fca5a5, #ef4444)",
              overflow: "hidden", boxShadow: "0 8px 24px rgba(239,68,68,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {avatar ? <img src={avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <User size={48} color="#fff" />}
            </div>
            {editing && (
              <button onClick={() => fileRef.current.click()} style={{
                position: "absolute", bottom: "4px", right: "4px", width: "32px", height: "32px",
                borderRadius: "50%", background: COLORS.red, border: "2px solid #fff",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Camera size={14} color="#fff" />
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} style={{ display: "none" }} />
          </div>
          <div style={{ paddingBottom: "12px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: COLORS.dark, fontFamily: "Georgia, serif", margin: 0 }}>
              {form.firstName} {form.lastName}
            </h1>
            <p style={{ color: COLORS.gray, fontSize: "14px", margin: "4px 0 0" }}>{form.email} · {form.city}</p>
            <span style={{ display: "inline-block", marginTop: "6px", background: COLORS.redLight, color: COLORS.red, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {form.dietType}
            </span>
          </div>
          {saved && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", background: "#dcfce7", color: "#16a34a", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, marginBottom: "12px" }}>
              <CheckCircle size={16} /> Saved!
            </div>
          )}
        </div>

        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <StatCard icon={BookOpen} label="Recipes Saved" value={`${currentUser?.savedRecipes.length}`} color={COLORS.red} />
          <StatCard icon={Utensils} label="Diet Type" value={form.dietType.toLocaleLowerCase()} color={COLORS.blue} />
          <StatCard icon={TrendingUp} label="Health Goal" value={form.healthGoal} color="#f59e0b" />
          <StatCard icon={Heart} label="Activity Level" value={form.activityLevel} color="#10b981" />
        </div>

        {/* tabs */}
        <div style={{ display: "flex", gap: "4px", background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "4px", marginBottom: "24px", width: "fit-content" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600,
              background: activeTab === t.id ? COLORS.red : "transparent",
              color: activeTab === t.id ? "#fff" : COLORS.gray,
              transition: "all 0.2s",
            }}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {/* tab content */}
        {activeTab === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <User size={16} color={COLORS.red} /> Personal Information
              </h2>
              <InputField label="First Name" icon={User} name="firstName" value={form.firstName} editable={editing} onChange={handleChange} />
              {/* <InputField label="Last Name" icon={User} name="lastName" value={form.lastName} editable={editing} onChange={handleChange} /> */}
              <InputField label="Email Address" icon={Mail} name="email" value={form.email} editable={editing} onChange={handleChange} />
              <InputField label="Phone" icon={Phone} name="phone" value={form.phone} editable={editing} onChange={handleChange} />
              <InputField label="Date of Birth" icon={Calendar} name="dob" type="date" value={form.dob} editable={editing} onChange={handleChange} />
              <InputField label="Gender" icon={User} name="gender" value={form.gender} editable={editing} onChange={handleChange} options={["Female", "Male", "Non-binary", "Prefer not to say"]} />
            </div>
            {/* <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={16} color={COLORS.red} /> Location
                </h2>
                <InputField label="City" icon={MapPin} name="city" value={form.city} editable={editing} onChange={handleChange} />
                <InputField label="State" icon={MapPin} name="state" value={form.state} editable={editing} onChange={handleChange} />
                <InputField label="PIN Code" icon={MapPin} name="pincode" value={form.pincode} editable={editing} onChange={handleChange} />
              </div>
              <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Edit3 size={16} color={COLORS.red} /> About
                </h2>
                <textarea
                  name="bio" value={form.bio} onChange={handleChange} disabled={!editing}
                  rows={4}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: "8px",
                    border: `1.5px solid ${editing ? COLORS.red : COLORS.border}`,
                    background: editing ? "#fff" : COLORS.grayLight, fontSize: "14px",
                    color: COLORS.dark, resize: "none", outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
            </div> */}
          </div>
        )}

        {activeTab === "health" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <Heart size={16} color={COLORS.red} /> Body Metrics
              </h2>
              <InputField label="Weight (kg)" icon={Weight} name="weight" value={form.weight} editable={editing} onChange={handleChange} />
              <InputField label="Height (cm)" icon={Ruler} name="height" value={form.height} editable={editing} onChange={handleChange} />
              <InputField label="Blood Group" icon={Heart} name="bloodGroup" value={form.bloodGroup} editable={editing} onChange={handleChange} options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} />
            </div>
            <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <Utensils size={16} color={COLORS.red} /> Diet & Wellness
              </h2>
              <InputField label="Diet Type" icon={Utensils} name="dietType" value={form.dietType} editable={editing} onChange={handleChange} options={["Vegetarian", "Vegan", "Non-Vegetarian", "Keto", "Paleo", "Gluten-Free"]} />
              {/* <InputField label="Allergies" icon={AlertCircle} name="allergies" value={form.allergies} editable={editing} onChange={handleChange} /> */}
              <InputField label="Health Goal" icon={TrendingUp} name="healthGoal" value={form.healthGoal} editable={editing} onChange={handleChange} options={["Weight Loss", "Muscle Gain", "Maintain Weight", "Improve Immunity", "Better Digestion"]} />
              <InputField label="Activity Level" icon={TrendingUp} name="activityLevel" value={form.activityLevel} editable={editing} onChange={handleChange} options={["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extra Active"]} />
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: "0 0 20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={16} color={COLORS.red} /> Recent Activity
            </h2>
            {[
              { action: "Saved recipe", item: `${currentUser?.savedRecipes?.length===0? "Nothing Saved":currentUser?.savedRecipes?.length}`, time: "2 hours ago", color: COLORS.red },
              // { action: "Completed meal plan", item: "Monday Plan", time: "1 day ago", color: COLORS.blue },
              { action: "Tracked nutrition", item: "2,100 kcal logged", time: "2 days ago", color: "#10b981" },
              { action: "Joined challenge", item: "7-Day Healthy Eating", time: "3 days ago", color: "#f59e0b" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: a.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: COLORS.dark }}>{a.action}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: COLORS.gray }}>{a.item}</p>
                </div>
                <span style={{ fontSize: "12px", color: COLORS.gray }}>{a.time}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {[
              { icon: Bell, label: "Notification Preferences", desc: "Manage alerts and reminders", color: COLORS.blue },
              { icon: Shield, label: "Privacy & Security", desc: "Manage password and 2FA", color: "#10b981" },
              { icon: LogOut, label: "Sign Out", desc: "Sign out of your account", color: COLORS.gray },
              { icon: Trash2, label: "Delete Account", desc: "Permanently remove your account", color: COLORS.red },
            ].map((s, i) => (
              <button key={i} style={{
                display: "flex", alignItems: "center", gap: "16px",
                background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "12px",
                padding: "20px 24px", cursor: "pointer", textAlign: "left",
                transition: "box-shadow 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={18} color={s.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: i === 3 ? COLORS.red : COLORS.dark }}>{s.label}</p>
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
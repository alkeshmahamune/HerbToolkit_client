import React, { useState } from "react";
import {
  Users,
  Stethoscope,
  Video,
  Apple,
  Download,
  Search,
  Filter,
  TrendingUp,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ─── Seed analytics data ──────────────────────────────────────────────────────

const MONTHLY_USERS = [
  { month: "Oct", users: 410, doctors: 18, influencers: 24 },
  { month: "Nov", users: 580, doctors: 22, influencers: 31 },
  { month: "Dec", users: 720, doctors: 28, influencers: 38 },
  { month: "Jan", users: 940, doctors: 35, influencers: 47 },
  { month: "Feb", users: 1180, doctors: 41, influencers: 56 },
  { month: "Mar", users: 1420, doctors: 48, influencers: 64 },
];

const RECIPE_UPLOADS = [
  { month: "Oct", herbal: 12, regular: 28, video: 19 },
  { month: "Nov", herbal: 18, regular: 34, video: 26 },
  { month: "Dec", herbal: 22, regular: 41, video: 31 },
  { month: "Jan", herbal: 31, regular: 55, video: 44 },
  { month: "Feb", herbal: 38, regular: 63, video: 50 },
  { month: "Mar", herbal: 44, regular: 72, video: 58 },
];

const RECIPE_CATEGORIES = [
  { name: "Indian", value: 142, color: "#f97316" },
  { name: "Herbal", value: 98, color: "#14b8a6" },
  { name: "Italian", value: 76, color: "#8b5cf6" },
  { name: "Asian", value: 64, color: "#06b6d4" },
  { name: "Japanese", value: 48, color: "#ec4899" },
  { name: "Other", value: 72, color: "#94a3b8" },
];

const REVIEW_STATUS = [
  { name: "Approved", value: 84, color: "#14b8a6" },
  { name: "Pending", value: 12, color: "#f59e0b" },
  { name: "Rejected", value: 14, color: "#ef4444" },
];

const ALL_USERS = [
  {
    id: "u1",
    name: "Priya Sharma",
    role: "User",
    email: "priya@email.com",
    joined: "12 Jan 2025",
    recipes: 0,
    status: "active",
  },
  {
    id: "u2",
    name: "Ananya Kapoor",
    role: "Influencer",
    email: "ananya@email.com",
    joined: "5 Feb 2025",
    recipes: 12,
    status: "active",
  },
  {
    id: "u3",
    name: "Dr. Arjun Mehta",
    role: "Doctor",
    email: "arjun.dr@email.com",
    joined: "3 Jan 2025",
    recipes: 8,
    status: "active",
  },
  {
    id: "u4",
    name: "Rahul Mishra",
    role: "User",
    email: "rahul@email.com",
    joined: "20 Jan 2025",
    recipes: 0,
    status: "active",
  },
  {
    id: "u5",
    name: "FoodVlog India",
    role: "Influencer",
    email: "fvi@email.com",
    joined: "10 Dec 2024",
    recipes: 34,
    status: "suspended",
  },
  {
    id: "u6",
    name: "Dr. Meera Iyer",
    role: "Doctor",
    email: "meera.dr@email.com",
    joined: "15 Nov 2024",
    recipes: 5,
    status: "active",
  },
  {
    id: "u7",
    name: "Sam Patel",
    role: "User",
    email: "sam@email.com",
    joined: "28 Feb 2025",
    recipes: 0,
    status: "active",
  },
  {
    id: "u8",
    name: "Chef Ranveer",
    role: "Influencer",
    email: "ranveer@email.com",
    joined: "1 Mar 2025",
    recipes: 22,
    status: "active",
  },
  {
    id: "u9",
    name: "Dr. Sunita Rao",
    role: "Doctor",
    email: "sunita.dr@email.com",
    joined: "8 Oct 2024",
    recipes: 11,
    status: "active",
  },
  {
    id: "u10",
    name: "Deepa Reddy",
    role: "User",
    email: "deepa@email.com",
    joined: "14 Mar 2025",
    recipes: 0,
    status: "active",
  },
];

const ROLE_COLORS = {
  User: "bg-blue-50 text-blue-700 border-blue-100",
  Doctor: "bg-teal-50 text-teal-700 border-teal-100",
  Influencer: "bg-violet-50 text-violet-700 border-violet-100",
};

const STATUS_COLORS = {
  active: "bg-green-50 text-green-700",
  suspended: "bg-red-50 text-red-600",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : n);

// CSV download utility
const downloadCSV = (data, filename) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => `"${row[h] ?? ""}"`).join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Custom tooltip for charts
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-stone-200 rounded-xl px-3 py-2 shadow-lg text-[12px]">
      <p className="font-bold text-stone-800 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill || p.stroke }}>
          {p.name}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  sub,
  delay,
}) => (
  <div
    className="bg-white border border-stone-200 rounded-2xl p-5"
    style={{
      animation: `fadeUp .4s ${delay}s ease both`,
      opacity: 0,
      animationFillMode: "both",
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: iconBg }}
      >
        <Icon size={18} color={iconColor} />
      </div>
      <TrendingUp size={14} className="text-teal-500" />
    </div>
    <p className="text-[28px] font-bold text-stone-900 leading-none mb-1">
      {value}
    </p>
    <p className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">
      {label}
    </p>
    {sub && (
      <p className="text-[11px] text-teal-600 font-semibold mt-1">↑ {sub}</p>
    )}
  </div>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section = ({ title, children, action, delay = "0s" }) => (
  <div
    className="bg-white border border-stone-200 rounded-2xl p-5"
    style={{
      animation: `fadeUp .4s ${delay} ease both`,
      opacity: 0,
      animationFillMode: "both",
    }}
  >
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-[15px] font-bold text-stone-900">{title}</h3>
      {action}
    </div>
    {children}
  </div>
);

// ─── Main AdminAnalytics Component ───────────────────────────────────────────

const AdminAnalytics = () => {
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [chartTab, setChartTab] = useState("users");

  const filteredUsers = ALL_USERS.filter((u) => {
    const matchRole =
      roleFilter === "all" || u.role.toLowerCase() === roleFilter;
    const q = userSearch.toLowerCase();
    const matchQ =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q);
    return matchRole && matchQ;
  });

  // Download helpers
  const downloadReport = (type) => {
    const map = {
      users: ALL_USERS.filter((u) => u.role === "User"),
      doctors: ALL_USERS.filter((u) => u.role === "Doctor"),
      influencers: ALL_USERS.filter((u) => u.role === "Influencer"),
      all: ALL_USERS,
      recipes: RECIPE_UPLOADS.map((r, i) => ({
        month: r.month,
        herbal: r.herbal,
        regular: r.regular,
        video: r.video,
        total: r.herbal + r.regular + r.video,
      })),
    };
    downloadCSV(
      map[type] || ALL_USERS,
      `${type}_report_${new Date().toISOString().slice(0, 10)}.csv`,
    );
  };

  const STATS = [
    {
      icon: Users,
      iconBg: "#eff6ff",
      iconColor: "#3b82f6",
      label: "Total Users",
      value: "1,420",
      sub: "22% this month",
      delay: 0.05,
    },
    {
      icon: Stethoscope,
      iconBg: "#f0fdfa",
      iconColor: "#14b8a6",
      label: "Doctors",
      value: "48",
      sub: "7 this month",
      delay: 0.1,
    },
    {
      icon: Video,
      iconBg: "#faf5ff",
      iconColor: "#8b5cf6",
      label: "Influencers",
      value: "64",
      sub: "8 this month",
      delay: 0.15,
    },
    {
      icon: Apple,
      iconBg: "#fff7ed",
      iconColor: "#f97316",
      label: "Recipes Uploaded",
      value: "500",
      sub: "44 this month",
      delay: 0.2,
    },
  ];

  return (
    <>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
        {/* ── Header ── */}
        <div
          className="flex items-end justify-between flex-wrap gap-4 pb-6 mb-7 border-b border-stone-200"
          style={{ animation: "fadeUp .4s ease both" }}
        >
          <div>
            <p className="text-[11px] uppercase tracking-[2px] font-semibold text-violet-600 mb-1.5">
              Admin Portal
            </p>
            <h1 className="text-[26px] font-bold text-stone-900">
              Platform Analytics
            </h1>
            <p className="text-[12px] text-stone-400 mt-1">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Download reports */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All Users" },
              { key: "doctors", label: "Doctors" },
              { key: "influencers", label: "Influencers" },
              { key: "recipes", label: "Recipes" },
            ].map((r) => (
              <button
                key={r.key}
                onClick={() => downloadReport(r.key)}
                className="inline-flex items-center gap-1.5 border border-stone-200 bg-white
                           rounded-xl px-3.5 py-2 text-[12px] font-semibold text-stone-600
                           hover:border-violet-400 hover:text-violet-600 transition-all"
              >
                <Download size={13} /> {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* ── Charts row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 mb-4">
          {/* Growth chart */}
          <Section
            title="Platform Growth"
            delay=".22s"
            action={
              <div className="flex gap-1 bg-stone-100 rounded-xl p-1">
                {[
                  { key: "users", label: "Users" },
                  { key: "recipes", label: "Recipes" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setChartTab(t.key)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all
                      ${
                        chartTab === t.key
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-500 hover:text-stone-800"
                      }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={220}>
              {chartTab === "users" ? (
                <LineChart data={MONTHLY_USERS}>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#9a9a98" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9a9a98" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    name="Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="doctors"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    dot={false}
                    name="Doctors"
                  />
                  <Line
                    type="monotone"
                    dataKey="influencers"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                    name="Influencers"
                  />
                </LineChart>
              ) : (
                <BarChart data={RECIPE_UPLOADS} barSize={14} barGap={2}>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#9a9a98" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9a9a98" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="herbal"
                    fill="#14b8a6"
                    radius={[4, 4, 0, 0]}
                    name="Herbal"
                  />
                  <Bar
                    dataKey="regular"
                    fill="#f97316"
                    radius={[4, 4, 0, 0]}
                    name="Regular"
                  />
                  <Bar
                    dataKey="video"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                    name="Video"
                  />
                </BarChart>
              )}
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex gap-4 mt-2 flex-wrap">
              {(chartTab === "users"
                ? [
                    ["#3b82f6", "Users"],
                    ["#14b8a6", "Doctors"],
                    ["#8b5cf6", "Influencers"],
                  ]
                : [
                    ["#14b8a6", "Herbal"],
                    ["#f97316", "Regular"],
                    ["#8b5cf6", "Video"],
                  ]
              ).map(([color, label]) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </Section>

          {/* Pie charts stacked */}
          <div className="flex flex-col gap-4">
            {/* Recipe categories */}
            <Section title="Recipes by Category" delay=".26s">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={RECIPE_CATEGORIES}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {RECIPE_CATEGORIES.map((e) => (
                      <Cell key={e.name} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                {RECIPE_CATEGORIES.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: c.color }}
                    />
                    <span className="text-[11px] text-stone-500">{c.name}</span>
                    <span className="text-[11px] font-bold text-stone-700 ml-auto">
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Review status */}
            <Section title="Review Status" delay=".3s">
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={90} height={90}>
                  <PieChart>
                    <Pie
                      data={REVIEW_STATUS}
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={42}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {REVIEW_STATUS.map((e) => (
                        <Cell key={e.name} fill={e.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2 flex-1">
                  {REVIEW_STATUS.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5 text-[12px] text-stone-600">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: s.color }}
                        />
                        {s.name}
                      </span>
                      <span className="text-[12px] font-bold text-stone-800">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
        </div>

        {/* ── Recipe uploads bar detail ── */}
        <div className="mb-4">
          <Section
            title="Monthly Recipe Uploads — Detail"
            delay=".32s"
            action={
              <button
                onClick={() => downloadReport("recipes")}
                className="inline-flex items-center gap-1.5 border border-stone-200 bg-white
                           rounded-xl px-3 py-1.5 text-[11px] font-semibold text-stone-500
                           hover:border-violet-400 hover:text-violet-600 transition-all"
              >
                <Download size={12} /> Export
              </button>
            }
          >
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={RECIPE_UPLOADS} barSize={18} barGap={3}>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#9a9a98" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9a9a98" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar
                  dataKey="herbal"
                  fill="#14b8a6"
                  radius={[4, 4, 0, 0]}
                  name="Herbal"
                />
                <Bar
                  dataKey="regular"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                  name="Regular"
                />
                <Bar
                  dataKey="video"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  name="Video"
                />
              </BarChart>
            </ResponsiveContainer>
          </Section>
        </div>

        {/* ── User table ── */}
        <Section
          title="All Users"
          delay=".35s"
          action={
            <div className="flex gap-2 flex-wrap items-center">
              {/* Role filter */}
              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="appearance-none border border-stone-200 rounded-xl pl-3 pr-8 py-2
                             text-[12px] font-semibold text-stone-600 bg-white outline-none
                             focus:border-violet-400 cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="user">Users</option>
                  <option value="doctor">Doctors</option>
                  <option value="influencer">Influencers</option>
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                />
              </div>

              {/* Search */}
              <div className="relative">
                <Search
                  size={12}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                />
                <input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users…"
                  className="pl-7 pr-3 py-2 border border-stone-200 rounded-xl text-[12px]
                             bg-white text-stone-800 outline-none focus:border-violet-400
                             transition-all placeholder:text-stone-400 w-40"
                />
              </div>

              <button
                onClick={() => downloadReport("all")}
                className="inline-flex items-center gap-1.5 border border-stone-200 bg-white
                           rounded-xl px-3 py-2 text-[11px] font-semibold text-stone-500
                           hover:border-violet-400 hover:text-violet-600 transition-all"
              >
                <Download size={12} /> Export
              </button>
            </div>
          }
        >
          <div className="overflow-x-auto -mx-1">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Name", "Role", "Email", "Joined", "Recipes", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] font-bold text-stone-400 uppercase tracking-wider
                                 pb-3 pt-1 px-2 border-b border-stone-100"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, i) => (
                  <tr
                    key={u.id}
                    className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                    style={{
                      animation: `fadeUp .3s ${0.35 + i * 0.03}s ease both`,
                      opacity: 0,
                      animationFillMode: "both",
                    }}
                  >
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center
                                        text-[10px] font-bold text-stone-500 shrink-0"
                        >
                          {u.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span className="text-[13px] font-semibold text-stone-800">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={`text-[10px] font-bold border px-2 py-1 rounded-full ${ROLE_COLORS[u.role]}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-[12px] text-stone-500">
                      {u.email}
                    </td>
                    <td className="px-2 py-3 text-[12px] text-stone-500 whitespace-nowrap">
                      {u.joined}
                    </td>
                    <td className="px-2 py-3 text-[12px] font-bold text-stone-700 text-center">
                      {u.recipes}
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize ${STATUS_COLORS[u.status]}`}
                      >
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="py-12 text-center text-stone-400">
                <p className="text-[13px] font-medium">No users found</p>
              </div>
            )}
          </div>

          {/* Table footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
            <p className="text-[12px] text-stone-400">
              Showing {filteredUsers.length} of {ALL_USERS.length} users
            </p>
            <div className="flex gap-2">
              {[
                { key: "users", label: "Users" },
                { key: "doctors", label: "Doctors" },
                { key: "influencers", label: "Influencers" },
              ].map((r) => (
                <button
                  key={r.key}
                  onClick={() => downloadReport(r.key)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-400
                             hover:text-violet-600 transition-colors"
                >
                  <Download size={11} /> {r.label}
                </button>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default AdminAnalytics;

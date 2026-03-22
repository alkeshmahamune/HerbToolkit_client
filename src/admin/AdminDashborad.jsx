import React, { useState, Suspense, lazy } from "react";
import {
  Search,
  ChevronDown,
  PanelLeft,
  User2,
  PanelLeftClose,
  HomeIcon,
  LogOut,
  Stethoscope,
  TabletSmartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import HerbToolkit from "../assets/HerbToolkit.png";
import { Khalbatta } from "../CustomIcons";

// Lazy pages
const Activeusers = lazy(() => import("./pages/Activeusers"));
const ActiveDr = lazy(() => import("./pages/ActiveDr"));
const AdminAnalytics = lazy(() => import("./pages/Home"));
const Recipes = lazy(() => import("./pages/Recipes"));

export default function AdminDashboard() {
  const navigate = useNavigate();

  const menus = [
    { name: "Home", icon: HomeIcon, component: AdminAnalytics },
    { name: "Users", icon: User2, component: Activeusers },
    { name: "Doctors", icon: Stethoscope, component: ActiveDr },
    { name: "Influencers", icon: TabletSmartphone, component: ActiveDr },
    { name: "Recipes", icon: Khalbatta, component: Recipes },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(0);

  const ActiveComponent = menus[active].component;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 font-[Poppins]">
      
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md flex flex-col transition-all duration-300 ease-in-out overflow-hidden
        ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center border-b border-gray-200 px-4">
          <div className="flex items-center gap-3 w-full">
            <div className="bg-green-100 p-2 rounded-xl shadow-sm">
              <img
                src={HerbToolkit}
                alt="logo"
                className="w-8 h-8 object-contain"
              />
            </div>

            {/* Animated Title */}
            <span
              className={`text-lg font-semibold text-gray-800 tracking-wide whitespace-nowrap transition-all duration-300
              ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
            >
              HerbToolkit
            </span>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex items-center border-b border-gray-200">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center transition-all duration-300 
            ${collapsed ? "justify-center" : "justify-end pr-4"} 
            py-3 hover:bg-gray-100`}
          >
            {collapsed ? (
              <PanelLeft size={20} className="text-gray-600" />
            ) : (
              <PanelLeftClose size={20} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 space-y-2 mt-2">
          {menus.map((menu, index) => {
            const Icon = menu.icon;

            return (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-300
                ${collapsed ? "justify-center" : ""}
                ${
                  active === index
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-teal-100"
                }`}
              >
                <Icon size={20} />

                {/* Animated Text */}
                <span
                  className={`text-sm whitespace-nowrap transition-all duration-300
                  ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
                >
                  {menu.name}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-300
            text-red-500 hover:bg-red-50 ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut size={20} />

            <span
              className={`text-sm font-medium whitespace-nowrap transition-all duration-300
              ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Right Section */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        
        {/* Header */}
        <header className="sticky shadow-md top-0 h-16 bg-white flex items-center justify-between px-6">
          <div className="text-lg font-semibold text-gray-700">
            Hello User!
          </div>

          {/* Search */}
          <div className="relative w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              A
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-100">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">Loading...</div>
                </div>
              }
            >
              <ActiveComponent />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import herbToolkit from "../assets/Htoolkit.png";
import { Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [navState, setNavState]=useState(false)

  const navigate=useNavigate()
    const navigateLogin=()=>{
      navigate("/login")
    }
    const navigateSignup=()=>{
      navigate("/register")
    }
  return (
    <div className="w-full h-12 flex justify-center items-center fixed top-0 left-0 bg-white z-50">
      <nav className="w-[87%]  flex items-center justify-between fixed top-2 -left-[50] -right-[50]">
        <img src={herbToolkit} alt="" width={"150px"} className="object-center" />
        <ul className=" hidden sm:hidden md:flex lg:flex xl:flex w-[55%] rounded-lg py-2 box-border px-4 bg-gray-100 text-gray-900  justify-between items-center">
          <li className="cursor-pointer font-semibold hover:text-gray-800 transition-colors duration-500">Home</li>
          <li className="cursor-pointer font-semibold hover:text-gray-800 transition-colors duration-500">Blogs</li>
          <li className="cursor-pointer font-semibold hover:text-gray-800 transition-colors duration-500">About Us</li>
          <li className="cursor-pointer font-semibold hover:text-gray-800 transition-colors duration-500">Contact Us</li>
        </ul>
        <div className="w-[20%] flex justify-center gap-8 items-center">
          <button className=" hidden sm:flex md:flex lg:flex xl:flex border cursor-pointer font-semibold border-blue-500 rounded-md px-3 py-2 " onClick={navigateLogin}>Sign In</button>
          <button className=" hidden sm:flex md:flex lg:flex xl:flex border bg-blue-500 font-semibold text-white cursor-pointer border-blue-500 hover:text-black hover:bg-white transition-all rounded-md px-3 py-2 " onClick={navigateSignup}>Sign Up</button>
        </div>
        <div className="flex sm:hidden md:hidden lg:hidden xl:hidden relative">
            <Menu onClick={()=>setNavState(!navState)}/>
        </div> 
        <div className={`${navState?"flex":"hidden"} w-[45%] flex-col font-semibold p-5 box-border right-0.5 h-auto sm:hidden md:hidden lg:hidden xl:hidden absolute -bottom-45 shadow-md`}>
            <p className="hover:translate-x-1 transition-all">Home</p>
            <p className="hover:translate-x-1 transition-all">Blogs</p>
            <p className="hover:translate-x-1 transition-all">About Us</p>
            <p className="hover:translate-x-1 transition-all">Contact Us</p>
            <p className="hover:translate-x-1 transition-all">Sign Up</p>
            <p className="hover:translate-x-1 transition-all">Sign In</p>
        </div>
      </nav>
    </div>
  );
};

export default Header;

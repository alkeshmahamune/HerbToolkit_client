import React from "react";
import Header from "../components/Header";
import heroImg from "../assets/heroImg.png";
import usertemp from "../assets/userThumbnail.jpg"
import iPhone from '../assets/iPhone.png'
import { Plus, Star } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate=useNavigate()
  const navigateLogin=()=>{
    navigate("/login")
  }
  const navigateSignup=()=>{
    navigate("/register")
  }
  return (
    <div className="w-full flex flex-col gap-8">
      {/* header component */}
      <Header />

      {/* hero section */}
      <div className="w-full h-[65%] justify-between items-center sm:w-[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 sm:h-svh md:h-svh lg:h-svh xl:h-svh sm:mx-auto flex sm:justify-start md:justify-start lg:justify-start xl:justify-start">
        <div className=" w-full h-full sm:w-[60%] flex flex-col gap-8 justify-center items-start">
          <h1 className="font-bold text-6xl roboto leading-22">
            Cook Smarter. Eat Better. <br />
            Your AI-Powered <br />{" "}
            <span className="text-red-600">Kitchen Companion</span>
          </h1>
          {/* <p className='text-gray-500 poppins text-lg'>An AI powered recipe management application with inventory management system and personal health care tracker</p> */}
          <p className="text-gray-500 poppins text-lg">
            Discover personalized recipes, manage your kitchen inventory, and
            get intelligent cooking and wellness guidance — all in one powerful
            platform.
          </p>
          <div className="w-full flex justify-start gap-8">
            <button className="px-3 py-2 bg-blue-500 border hover:text-black hover:bg-white transition-all border-blue-500 rounded-md font-semibold text-white cursor-pointer" onClick={()=>navigateSignup()}>
              Get Started Free
            </button>
            <button className="px-3 py-2 text-black border border-blue-500 rounded-md font-semibold  cursor-pointer" onClick={navigateLogin}>
              Explore Recipes
            </button>
          </div>
        </div>
        <div className="w-[40%] flex justify-center items-center">
          <img src={heroImg} alt="" className="w-full" />
        </div>
      </div>

      {/* main content */}
      <div className="w-full flex justify-between items-start pb-5 sm:w[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto ">
        <div className="w-[60%] h-120 bg-red-400"></div>
        <div className="w-[35%] flex flex-col gap-5">
          <h1 className="font-semibold roboto text-3xl">Key Features</h1>
          <ul className="px-7 leading-10">
            <li className="poppins-light">AI Powered</li>
            <li className="poppins-light">Inventory Tracker</li>
            <li className="poppins-light">Personal Recipe Manager</li>
            <li className="poppins-light">Health and Skin Care</li>
            <li className="poppins-light">Influencer and Community Module</li>
            <li className="poppins-light">Multi-Format Recipe Sharing</li>
          </ul>
          {/* <div className="w-full">
            <button className="bg-blue-500 font-semibold px-3 py-2 rounded-md text-white">
              Try Out
            </button>
          </div> */}
        </div>
      </div>

      {/* sub content */}
      <div className="w-full flex flex-col justify-between gap-6 items-start pb-5 sm:w[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto ">
        <div className="w-full flex justify-start gap-55">
          <div className="w-[50%]">
            <h1 className="font-semibold text-4xl roboto">Hi, <span className="text-red-600">Foodies</span></h1>
            <p className="text-gray-500 py-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              nobis ea et aspernatur quod accusantium sit est magnam, alias
              velit veritatis? Unde neque, itaque nemo earum nulla beatae velit
              at.
            </p>
          </div>
          <div className="w-[25%] flex flex-col justify-between relative items-center">
            <div className="w-15 h-15 bg-red-400 rounded-full absolute right-50 bg-center bg-cover" style={{ backgroundImage: `url(${usertemp})` }}></div>
            <div className="w-15 h-15 bg-red-400 rounded-full absolute right-39 -z-20 bg-center bg-cover" style={{ backgroundImage: `url(${usertemp})` }}></div>
            <div className="w-15 h-15 bg-red-400 rounded-full absolute right-29 -z-30 bg-center bg-cover" style={{ backgroundImage: `url(${usertemp})` }}></div>
            <div className="w-15 h-15 bg-red-400 rounded-full absolute right-19 -z-40 bg-center bg-cover" style={{ backgroundImage: `url(${usertemp})` }}></div>
            
            <div className="w-15 h-15 flex justify-center items-center rounded-full absolute right-0 text-center">
              <Plus/>
            </div>
            <div className="w-full absolute bottom-5 text-center">
              <p className="poppins font-semibold">Our Happy Customes</p>
              <p className="poppins-light">4.8 reviews</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[20%] flex flex-col py-5 items-center justify-center">
            <h1 className="font-bold text-3xl roboto">10K+</h1>
            <p className="font-semibold poppins text-gray-500">Users</p>
          </div>
          <div className="w-[20%] flex flex-col py-5 items-center justify-center">
            <h1 className="font-bold text-3xl roboto">98%</h1>
            <p className="font-semibold poppins text-gray-500">
              User Satisfaction
            </p>
          </div>
          <div className="w-[20%] flex flex-col py-5 items-center justify-center">
            <h1 className="font-bold text-3xl roboto">500+</h1>
            <p className="font-semibold poppins text-gray-500">Items of Food</p>
          </div>
          <div className="w-[20%] flex flex-col py-5 items-center justify-center">
            <h1 className="font-bold text-3xl roboto">10+</h1>
            <p className="font-semibold poppins text-gray-500">Categories</p>
          </div>
        </div>
      </div>

      {/* last content */}
      <div className="w-full sm:w[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto   flex justify-between">
        <div className="w-[60%]">

        </div>
        <div className="w-[35%] flex flex-col gap-5">
          <h1 className="uppercase font-bold poppins-semibold tracking-widest text-xl text-red-600">What they say</h1>
          <h1 className="roboto font-bold text-4xl">What Our Customer Say about us</h1>
          <p className="poppins text-lg font-semibold text-gray-500">"This app completely changed how I plan my meals. The AI suggests recipes based on what I already have at home — no more food waste!"</p>
          <div className="w-full flex justify-start gap-5 items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img src={usertemp} alt="" />
            </div>
            <div>
              <p className="poppins-semibold">Shivani Manjre</p>
              <p className="font-light">Food Enthusiastic</p>
            </div>
          </div>
        </div>
        
      </div>
      <div className="w-full flex flex-col justify-between gap-6 items-start pb-5 sm:w[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto ">
        <div className="w-full h-135 flex justify-between bg-red-50 rounded-md">
          <div className="w-[40%] flex flex-col gap-8 justify-start p-5 ">
            <h1 className="uppercase font-bold poppins-semibold tracking-widest text-xl text-red-600">GET STARTED</h1>
            <h2 className="roboto capitalize font-bold text-4xl">get Started with HerbToolkit today!</h2>
            <p className="font-semibold text-gray-800 open-sans">Discover personalized recipes, manage your kitchen inventory, and get intelligent cooking and wellness guidance — all in one platform.</p>
            <div className="py-8">
              <button className="py-2 px-3 rounded-lg bg-red-500 font-semibold text-white cursor-pointer">Get Started</button>
            </div>
          </div>
          <div className="w-[55%] flex justify-center items-center">
            <img src={iPhone} alt="" className="w-[35%]"/>
          </div>
        </div>
      </div>

      {/* footer component */}
      <Footer/>
    </div>
  );
};

export default Landing;

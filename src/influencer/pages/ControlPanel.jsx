import { Apple, ArrowLeft, Heart, UsersRound } from "lucide-react";
import React, { useState } from "react";
import { recipesUploaded } from "../recipeData";

const Dashboard = () => {
  const [showRecipe,setShowRecipe]=useState(null)
  console.log(showRecipe)
  return (
    <>
      <div className={`${showRecipe!==null?"hidden":"flex flex-col"}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Dashboard</h2>
        <div className="w-full flex flex-wrap gap-15">
          <div className="w-1/6 h-30 flex flex-col justify-between rounded-xl shadow-xl border-2 cursor-pointer transform-3d transition-all hover:scale-90 border-gray-300 p-2">
            <div className="flex gap-1 items-center">
              <UsersRound />
              <h6 className=" poppins uppercase text-xs p-3 font-semibold">
                {" "}
                Followers
              </h6>
            </div>
            <div className="w-full h-80  flex justify-center items-center">
              <h2 className="roboto text-4xl">16K</h2>
            </div>
          </div>
          <div className="w-1/6 h-30 flex flex-col justify-between rounded-xl shadow-xl border-2 cursor-pointer transform-3d transition-all hover:scale-90 border-gray-300 p-2">
            <div className="flex gap-1 items-center">
              <Apple />
              <h6 className=" poppins uppercase text-xs p-3 font-semibold">
                {" "}
                Recipies Posted
              </h6>
            </div>
            <div className="w-full h-80  flex justify-center items-center">
              <h2 className="roboto text-4xl">12</h2>
            </div>
          </div>
          <div className="w-1/6 h-30 flex flex-col justify-between rounded-xl shadow-xl border-2 cursor-pointer transform-3d transition-all hover:scale-90 border-gray-300 p-2">
            <div className="flex gap-1 items-center">
              <Heart />
              <h6 className=" poppins uppercase text-xs p-3 font-semibold">
                {" "}
                Likes
              </h6>
            </div>
            <div className="w-full h-80  flex justify-center items-center">
              <h2 className="roboto text-4xl">12K</h2>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 mt-8">
          Uploaded Recipies
        </h2>
        <div className="w-full flex flex-wrap gap-10">
          {recipesUploaded.map((ele, index) => (
            <div className="w-1/4" key={index+1} onClick={()=>setShowRecipe(index)}>
              <div
                className="w-full h-40 flex cursor-pointer items-end bg-red-50 rounded-tr-xl rounded-tl-xl border overflow-hidden p-3"
                style={{
                  backgroundImage: `url(${ele.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="w-full flex  justify-between text-white text-sm">
                  <div className="flex gap-1 p-1 items-center rounded-xl bg-black/40">
                    <Heart size={15} />
                    {ele.likes}
                  </div>
                  <p className="p-2 bg-black/60 rounded-xl text-xs">
                    {ele.time}
                  </p>
                </div>
              </div>
              <div className="w-full leading-8 border border-t-0 rounded-bl-xl rounded-br-xl  text-sm p-3">
                <h1 className="font-semibold">{ele.name}</h1>
                <p className="w-1/3 py-1 text-center text-sm rounded-md bg-orange-300">
                  {ele.category}
                </p>
                <p>{ele.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {
        showRecipe!==null && (
          <div className="w-full h-screen flex-col relative">
            <ArrowLeft className="cursor-pointer absolute left-5 top-5" onClick={()=>setShowRecipe(null)}/>
              <div className="w-full h-150 bg-red-300 rounded-md"></div>
          </div>
        )
      }
    </>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { data, recipes } from "../data.js";
import { ArrowLeft } from "lucide-react";

const Home = () => {
  const [selectedRecipe,setSelectedRecipe]=useState(null)
  const handleClickRecipe=(recipe)=>{
    setSelectedRecipe(recipe)
  }
  const goback=()=>{
    setSelectedRecipe(null)
  }
  if(selectedRecipe){
    return(
      <>
        <div className="w-full flex justify-start">
          <ArrowLeft onClick={goback} size={25} className="border rounded-full cursor-pointer"/>
        </div>
        <div className="w-full h-80 my-8 rounded-lg bg-red-500"></div>
      </>
    )
  }
  return (
    <div className="w-full mx-auto flex flex-col gap-5">
      {/* category section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Categories</h2>
      <div className="w-full flex flex-wrap gap-10">
        {data.map((ele, idx) => (
          <div
            key={idx + ele.id}
            className="w-1/5 h-40 relative cursor-pointer rounded-xl overflow-hidden group"
          >
            <img
              src={ele.cover}
              alt={ele.heading}
              loading="lazy"
              onClick={()=>handleClickRecipe(ele)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute bottom-2 right-3 text-white font-semibold text-sm bg-black/40 px-2 py-1 rounded">
              {ele.heading}
            </div>
          </div>
        ))}
      </div>

      {/* Recently Viewed section */}
      <div className="mt-8">
        {/* Section Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Recently Viewed Recipes
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
            >
              {/* Image */}
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-40 w-full object-cover"
              />

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {recipe.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">{recipe.category}</p>

                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 rounded-lg transition">
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

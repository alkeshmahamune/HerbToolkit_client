import React from 'react'
import herbToolkit from "../assets/Htoolkit.png";

const Footer = () => {
  return (
    <div className='w-full p-5 bg-[#F9FBF8]'>
      <div className='w-1/4 flex flex-col justify-start items-start '>
        <img src={herbToolkit} alt="" className='w-[40%]'/>
        <p className='font-semibold px-2 text-[#1B1B1B] py-5 poppins'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste odit deserunt, placeat explicabo magnam id quod x!</p>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Footer

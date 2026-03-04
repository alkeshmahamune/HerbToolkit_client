import React from 'react'
import iPhone from '../assets/jpgIphone.png'
import { User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate=useNavigate()
  return (
    <div className='w-full h-svh flex justify-between'>
      <div className='w-[60%] bg-blue-500 flex justify-center items-center'>
        <img src={iPhone} alt="" className='w-1/3'/>
      </div>
      <div className='w-[35%] h-full flex flex-col justify-center'>
        <form className='w-[85%] p-3 box-border rounded-md flex flex-col gap-8'>
            <h1 className='text-start text-4xl font-bold text-blue-500 poppins-bold'>Sign In</h1>
            <div className='w-[90%] border-2 border-gray-300  rounded-md flex justify-start items-center'>
                <User className='border-r border-gray-300 px-2' size={40}/>
                <input type="text" placeholder='Enter Email/Mobile No.' className='w-full poppins outline-0 p-2 box-border'/>
            </div>
            <div className='w-[90%] border-2 border-gray-300  rounded-md flex justify-start items-center'>
                <User className='border-r border-gray-300 px-2' size={40}/>
                <input type="password" placeholder='Enter Your Password' className='w-full poppins outline-0 p-2 box-border'/>
            </div>
            <div className='w-[90%] flex justify-between'>
                <span className='flex gap-2 items-center'>
                <input type="checkbox" name="passSuggester" id="" className='h-4 w-4'/>Remember Me</span>
                <p className='text-blue-400 underline cursor-pointer'>Forgot Password</p>
            </div>
            <button className='w-1/3 cursor-pointer py-2 rounded-md poppins-semibold text-white bg-blue-500'>Sign In</button>
            <hr />
            <p className='text-center'>don't have account? <span className='text-blue-500 cursor-pointer underline' onClick={()=>navigate('/register')}>Register Now</span></p>
        </form>
      </div>
    </div>
  )
}

export default Login

import React, { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import GoogleAuth from '../components/GoogleAuth';
import { Link } from 'react-router-dom';
const Login = () => {
  // State for managing password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  return (
    <div className='flex justify-center items-center h-[100vh]  bg-[#F7f7f7] box-border'>
      <div className='bg-white box-border max-w-[350px] w-[350px] rounded-md px-4'>
        <h1 className='mt-[20px] text-[22px] font-[600]'>Login to your Account</h1>
        <form className='flex flex-col box-border mt-[18px] gap-2'>
          <div>
            <input className='w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2' type="text" placeholder='Enter username or email' required />
          </div>

          <div className='flex items-center justify-between border-[2px] border-slate-150 rounded-lg p-2'>
            <input
              className='outline-none w-full'
              type={passwordVisible ? 'text' : 'password'}
              placeholder='Enter password'
              required
            />
            <div onClick={togglePasswordVisibility} className="cursor-pointer text-[18px]">
              {passwordVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>
    
  
          
          <div>
            <button className='w-full p-2.5 rounded-lg mt-[5px] bg-main text-white font-[600] hover:opacity-80'>
              Login to Account
            </button>
          </div>
        </form>
        <div className='my-3 text-center'>
          <p className='text-[#777] font-[400]'>Do not have an Account? <Link to={'/signup'}><span className='text-main  cursor-pointer font-[500] hover:underline '>Click Here</span></Link></p>
        </div>
      
          <div className='mb-4'>
            <GoogleAuth />
          </div>
      </div>
    </div>
  );
};

export default Login;

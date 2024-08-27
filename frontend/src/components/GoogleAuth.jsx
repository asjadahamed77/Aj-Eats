import React from 'react'
import googleIcon from '../assets/icons/google.png'
const GoogleAuth = () => {
  return (
    <div>
      <div className='flex justify-center gap-4 items-center font-[500] cursor-pointer border-[2px] border-slate-150 p-2 rounded-lg hover:opacity-75 bg-[#f8f8f8]'>
        Sign In with Google <img className='w-[25px] h-[25px]' src={googleIcon} alt="Google" />
      </div>
    </div>
  )
}

export default GoogleAuth

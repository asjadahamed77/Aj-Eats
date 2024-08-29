import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../store/userSlice.js';
import { useNavigate } from 'react-router-dom';
import backendDomain from '../helpers/backendDomain';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googleIcon from '../assets/icons/google.png'
const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
  
      const result = await signInWithPopup(auth, provider);
  
      const res = await fetch(`${backendDomain}/user/google-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          userImage: result.user.photoURL,
        }),
        credentials: 'include', // Ensure cookies are sent with requests
      });
  
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await res.json();
      dispatch(signInSuccess(data));
      toast.success('Signed in with Google successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Could not sign in with Google');
      console.log('Error during Google sign-in:', error);
    }
  };
  return (
    <div>
      <div onClick={handleGoogleClick}  className='flex justify-center gap-4 items-center font-[500] cursor-pointer border-[2px] border-slate-150 p-2 rounded-lg hover:opacity-75 bg-[#f8f8f8]'>
        Sign In with Google <img className='w-[25px] h-[25px]' src={googleIcon} alt="Google" />
      </div>
    </div>
  )
}

export default GoogleAuth

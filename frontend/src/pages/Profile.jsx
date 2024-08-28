import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { signOut } from '../store/userSlice';
import backendDomain from '../helpers/backendDomain';
import profileIcon from '../assets/icons/profile.png';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [profileImage, setProfileImage] = useState(profileIcon); // Initial profile icon
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
    address: ''
  });

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${backendDomain}/user/details`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUserDetails({
            username: data.username,
            email: data.email,
            phone: data.phone,
            address: data.address
          });
          if (data.profileImage) {
            setProfileImage(data.profileImage);
          }
        } else {
          toast.error('Failed to fetch user details.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${backendDomain}/user/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        dispatch(signOut());
        toast.success('Logged out successfully!');
        navigate('/login');
      } else {
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during logout.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();

      // Simulate progress
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 10, 100);
          if (newProgress === 100) {
            clearInterval(interval);
            setUploading(false);
          }
          return newProgress;
        });
      }, 200);

      reader.onload = () => {
        setProfileImage(reader.result);
        setProgress(100); // Ensure progress completes
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendDomain}/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative flex justify-center items-center h-[100vh] bg-[#F7f7f7] box-border'>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <ClipLoader color={"#ffffff"} size={50} />
        </div>
      )}
      {uploading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <ClipLoader color={"#ffffff"} size={50} />
          <div className="mt-4 text-white text-lg">Uploading... {progress}%</div>
        </div>
      )}
      <form className='flex flex-col gap-4 w-[350px] bg-white px-4 rounded-lg box-border'>
        <h1 className='mt-[20px] text-[22px] font-[600] text-center'>User Profile</h1>
        <div className='flex justify-center relative'>
          <img className='w-[100px] h-[100px] mb-4 rounded-full p-1 object-cover border-[4px] border-main' src={profileImage} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            title=" "
          />
        </div>
        <div>
          <input
            className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
            type="text"
            placeholder='username'
            value={userDetails.username}
            onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
          />
        </div>
        <div>
          <input
            className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
            type="email"
            placeholder='user email'
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          />
        </div>
        <div>
          <input
            className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
            type="text"
            placeholder='phone'
            value={userDetails.phone}
            onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
          />
        </div>
        <div>
          <input
            className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
            type="text"
            placeholder='address'
            value={userDetails.address}
            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
          />
        </div>
        <div className='flex justify-between my-4'>
          <button 
            type="button" 
            onClick={handleUpdate} 
            className='bg-main w-[100px] uppercase py-1.5 rounded-md text-white font-[600] hover:opacity-85'
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader color={"#ffffff"} size={20} />
              </div>
            ) : (
              "Update"
            )}
          </button>
          <button 
            type="button" 
            onClick={handleLogout} 
            className='bg-red-700 w-[100px] uppercase py-1.5 rounded-md text-white font-[600] hover:opacity-85'
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader color={"#ffffff"} size={20} />
              </div>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

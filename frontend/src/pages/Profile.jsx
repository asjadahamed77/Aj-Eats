import React, { useEffect, useState, useRef } from "react";
import profileIcon from "../assets/icons/profile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import backendDomain from "../helpers/backendDomain";
import {
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  console.log("Current User",currentUser)
  console.log('Token:', currentUser?.token);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    userImage: currentUser?.userImage || "",
  });

  useEffect(() => {
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileUploadError(true);
        toast.error("Image must be less than 2 MB");
        setFile(null);
        return;
      }
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        toast.error("Error uploading image");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prevData) => ({ ...prevData, userImage: downloadURL }))
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendDomain}/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(signOut());
        toast.success("Signed out successfully");
        navigate("/login");
      } else {
        toast.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error during signout:", error);
      toast.error("An error occurred while signing out");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, phone, address, userImage } = formData;

    try {
      dispatch(updateUserStart());
      const res = await fetch(`${backendDomain}/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          username,
          email,
          password: password ? password : undefined, 
          phone,
          address,
          userImage,
        }),
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateUserFailure(data.message || "Failed to update profile"));
        toast.error(data.message || "Failed to update profile");
        return;
      }
      console.log("Current User Token:",data.currentUser.token)

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      navigate("/");
      toast.success("Profile updated successfully!");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-[100vh] bg-[#F7f7f7] box-border">
      <div className="bg-white px-4 py-2 w-[350px] box-border">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-lg box-border">
          <h1 className="mt-[10px] text-[22px] font-[600] text-center">User Profile</h1>
          <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleFileSelect} />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.userImage || profileIcon}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center border-[2px] border-white p-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">Error uploading image</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-slate-800">Image successfully uploaded!</span>
            ) : (
              ""
            )}
          </p>
          <input
            className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
            type="text"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
            type="text"
            placeholder="Phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
            type="text"
            placeholder="Address"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
          <button className="bg-main w-full uppercase py-1.5 rounded-md text-white font-[600] hover:opacity-85">
            Update
          </button>
        </form>
        <button
          onClick={handleLogout}
          className="bg-slate-700 w-full uppercase mt-2 py-1.5 rounded-md text-white font-[600] hover:opacity-85"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

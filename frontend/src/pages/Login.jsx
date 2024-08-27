import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import GoogleAuth from "../components/GoogleAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backendDomain from "../helpers/backendDomain";
import { ClipLoader } from "react-spinners"; // Import the spinner

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "", // This can be username or email
    password: "",
  });
  const [loading, setLoading] = useState(false); // State for loading spinner

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = formData;

    setLoading(true); // Start loading spinner

    try {
      const response = await fetch(`${backendDomain}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      setLoading(false); // Stop loading spinner

      if (response.ok) {
        toast.success("Logged in successfully!");
        navigate("/"); 
      } else {
        toast.error(data.error || "Invalid credentials!");
      }
    } catch (error) {
      setLoading(false); // Stop loading spinner
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-[100vh] bg-[#F7f7f7] box-border">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <ClipLoader color={"#ffffff"} size={50} />
        </div>
      )}
      <div className="bg-white box-border max-w-[350px] w-[350px] rounded-md px-4">
        <h1 className="mt-[20px] text-[22px] font-[600]">Login to your Account</h1>
        <form className="flex flex-col box-border mt-[18px] gap-2" onSubmit={handleSubmit}>
          <div>
            <input
              className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
              type="text"
              placeholder="Enter username or email"
              id="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between border-[2px] border-slate-150 rounded-lg p-2">
            <input
              className="outline-none w-full"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div onClick={togglePasswordVisibility} className="cursor-pointer text-[18px]">
              {passwordVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>

          <div>
            <button
              className="w-full p-2.5 rounded-lg mt-[5px] bg-main text-white font-[600] hover:opacity-80"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader color={"#ffffff"} size={20} />
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                "Login to Account"
              )}
            </button>
          </div>
        </form>
        <div className="my-3 text-center">
          <p className="text-[#777] font-[400]">
            Do not have an Account?{" "}
            <Link to={"/signup"}>
              <span className="text-main cursor-pointer font-[500] hover:underline">
                Click Here
              </span>
            </Link>
          </p>
        </div>

        <div className="mb-4">
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import GoogleAuth from "../components/GoogleAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backendDomain from "../helpers/backendDomain";
import ClipLoader from "react-spinners/ClipLoader"; 

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      const response = await fetch(`${backendDomain}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await response.json();
      setLoading(false); // Stop loading spinner

      if (response.ok) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error(data.error || "Something went wrong!");
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
        <h1 className="mt-[20px] text-[22px] font-[600]">Create a New Account</h1>
        <form className="flex flex-col box-border mt-[18px] gap-2" onSubmit={handleSubmit}>
          <div>
            <input
              className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
              type="text"
              placeholder="Enter username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="w-full bg-transparent outline-none border-[2px] border-slate-150 rounded-lg p-2"
              type="email"
              placeholder="Enter email"
              id="email"
              value={formData.email}
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
          <div className="flex items-center justify-between border-[2px] border-slate-150 rounded-lg p-2">
            <input
              className="outline-none w-full"
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div onClick={toggleConfirmPasswordVisibility} className="cursor-pointer text-[18px]">
              {confirmPasswordVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </div>
          </div>
          <div className="flex items-center pl-2 mt-1 gap-2">
            <input type="checkbox" id="terms" className="h-4 w-4" required />
            <label className="text-[14px]">
              I agree to the <span className="text-main underline cursor-pointer">Terms and Conditions</span>
            </label>
          </div>

          <div>
            <button
              className="w-full p-2.5 rounded-lg mt-[5px] bg-main text-white font-[600] hover:opacity-80"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader color={"#ffffff"} size={20} />
                  <span className="ml-2">Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
        <div className="my-3 text-center">
          <p className="text-[#777] font-[400]">
            Already have an Account?{" "}
            <Link to={"/login"}>
              <span className="text-main cursor-pointer font-[500] hover:underline">
                Login Here
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

export default SignUp;

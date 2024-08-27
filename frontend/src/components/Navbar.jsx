import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="flex justify-between bg-white z-10 items-center fixed top-0 left-0 right-0 shadow-md p-2 px-4 tab:p-3 tab:px-4 phoneMax:p-3.5 phone:p-4">
      <div className="font-[700] text-[24px] text-main">
        AJ <span className="text-secondary">Eats</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="text-[25px] text-main font-[800] cursor-pointer phoneMax:text-[30px]">
        <IoSearchSharp />
        </div>
        <div className="text-[22px] text-main font-[800] cursor-pointer phoneMax:text-[28px]">
        <HiShoppingBag />
        </div>
        <div>
            <Link to={'/signup'}><button className="bg-main px-2 py-1 text-white font-[600] rounded-full text-[14px] hover:opacity-90 phoneMax:px-3 phoneMax:py-2">Sign Up</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('');

  return (
    <div className="fixed left-0 bottom-0 top-[53px] w-[200px] h-[100vh] flex flex-col shadow-2xl bg-slate-100">
      <ul className="mt-[100px] flex flex-col gap-2 px-2">
        <Link to="/add-foods">
          <li
            className={`pl-4 p-3 rounded-md border text-slate-900 font-medium 
              ${activeLink === '/add-foods' ? 'bg-slate-200 border-black border-[2px] shadow-lg' : 'hover:bg-slate-200'}`}
            onClick={() => setActiveLink('/add-foods')}
          >
            Add Foods
          </li>
        </Link>
        <Link to="/view-foods">
          <li
            className={`pl-4 p-3 rounded-md border text-slate-900 font-medium 
              ${activeLink === '/view-foods' ? 'bg-slate-200 border-black border-[2px] shadow-lg' : 'hover:bg-slate-200'}`}
            onClick={() => setActiveLink('/view-foods')}
          >
            View Foods
          </li>
        </Link>
        <Link to="/view-users">
          <li
            className={`pl-4 p-3 rounded-md border text-slate-900 font-medium 
              ${activeLink === '/view-users' ? 'bg-slate-200 border-black border-[2px] shadow-lg' : 'hover:bg-slate-200'}`}
            onClick={() => setActiveLink('/view-users')}
          >
            View Users
          </li>
        </Link>
        <Link to="/view-orders">
          <li
            className={`pl-4 p-3 rounded-md border text-slate-900 font-medium 
              ${activeLink === '/view-orders' ? 'bg-slate-200 border-black border-[2px] shadow-lg' : 'hover:bg-slate-200'}`}
            onClick={() => setActiveLink('/view-orders')}
          >
            View Orders
          </li>
        </Link>
        <Link to="/advertisement">
          <li
            className={`pl-4 p-3 rounded-md border text-slate-900 font-medium 
              ${activeLink === '/advertisement' ? 'bg-slate-200 border-black border-[2px] shadow-lg' : 'hover:bg-slate-200'}`}
            onClick={() => setActiveLink('/advertisement')}
          >
            Advertisements
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;

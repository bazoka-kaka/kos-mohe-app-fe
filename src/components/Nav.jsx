import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  return (
    <nav className='fixed z-50 flex justify-between w-full px-48 py-4 bg-white border-b-2 shadow-md'>
      {/* first part */}
      <div className='flex gap-12'>
        <Link to='/'>
          <img src='/logo.png' className='w-12' alt='' />
        </Link>
        <div className='flex items-center'>
          <input
            className='h-full w-5/6 px-4 rounded-xl bg-[#EDEEF2]'
            type='text'
            placeholder='Search'
          />
        </div>
      </div>
      {/* second part */}
      <ul className='flex items-center gap-12 text-sm'>
        {/* first ul */}
        <div className='flex gap-8'>
          <li>
            <Link
              className={`hover:text-slate-700 ${
                location.pathname === "/" && "font-semibold"
              }`}
              to='/'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text-slate-700 ${
                (location.pathname === "/kamar" ||
                  location.pathname === "/kamar/double-deluxe" ||
                  location.pathname === "/kamar/double-reguler" ||
                  location.pathname === "/kamar/reguler" ||
                  location.pathname === "/kamar/deluxe") &&
                "font-semibold"
              }`}
              to='/kamar'
            >
              Kamar
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text-slate-700 ${
                location.pathname === "/fitur" && "font-semibold"
              }`}
              to='/fitur'
            >
              Fitur
            </Link>
          </li>
        </div>
        <hr className='w-0.5 h-full bg-slate-200' />
        {/* second ul */}
        <div className='flex gap-8'>
          <li>
            <Link
              className={`hover:text-slate-700 ${
                location.pathname === "/login" && "font-semibold"
              }`}
              to='/login'
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text-slate-700 ${
                location.pathname === "/register" && "font-semibold"
              }`}
              to='/register'
            >
              Register
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;

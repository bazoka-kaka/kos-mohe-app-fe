import React from "react";
import { BiBox } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const ProtectedNav = () => {
  const location = useLocation();
  return (
    <nav className='fixed z-10 flex justify-between w-full px-48 py-4 bg-white border-b-2'>
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
        <div className='flex items-center gap-8'>
          <li>
            <Link
              className={`hover:text-slate-700 ${
                location.pathname === "/contact" && "font-semibold"
              }`}
              to='/contact'
            >
              Kontak
            </Link>
          </li>
          <li>
            <Link to='/' className='relative block p-2 rounded-lg bg-slate-100'>
              <BiBox className='text-xl font-semibold text-primary' />
              <div className='absolute top-0 right-0 px-1 text-xs text-white translate-x-1/2 -translate-y-1/2 rounded-md bg-primary'>
                4
              </div>
            </Link>
          </li>
          <li>
            <Link to='/dashboard' className='block w-10 h-10 rounded-lg'>
              <img
                className='w-10 h-10 rounded-lg'
                src='/imgs/profile.jpeg'
                alt=''
              />
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default ProtectedNav;

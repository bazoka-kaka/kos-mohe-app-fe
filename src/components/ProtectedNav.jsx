import React from "react";
import { BiBox } from "react-icons/bi";

const ProtectedNav = () => {
  return (
    <nav className='fixed z-10 flex justify-between w-full px-48 py-4 bg-white border-b-2'>
      {/* first part */}
      <div className='flex gap-12'>
        <a href='/'>
          <img src='/logo.png' className='w-12' alt='' />
        </a>
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
            <a
              className={`hover:text-slate-700 ${
                window.location.pathname === "/" && "font-semibold"
              }`}
              href='/'
            >
              Home
            </a>
          </li>
          <li>
            <a
              className={`hover:text-slate-700 ${
                (window.location.pathname === "/kamar" ||
                  window.location.pathname === "/kamar/double-deluxe" ||
                  window.location.pathname === "/kamar/double-reguler" ||
                  window.location.pathname === "/kamar/reguler" ||
                  window.location.pathname === "/kamar/deluxe") &&
                "font-semibold"
              }`}
              href='/kamar'
            >
              Kamar
            </a>
          </li>
          <li>
            <a
              className={`hover:text-slate-700 ${
                window.location.pathname === "/fitur" && "font-semibold"
              }`}
              href='/fitur'
            >
              Fitur
            </a>
          </li>
        </div>
        <hr className='w-0.5 h-full bg-slate-200' />
        {/* second ul */}
        <div className='flex items-center gap-8'>
          <li>
            <a
              className={`hover:text-slate-700 ${
                window.location.pathname === "/login" && "font-semibold"
              }`}
              href='/login'
            >
              Kontak
            </a>
          </li>
          <li>
            <a href='/' className='relative block p-2 rounded-lg bg-slate-100'>
              <BiBox className='text-xl font-semibold text-primary' />
              <div className='absolute top-0 right-0 px-1 text-xs text-white translate-x-1/2 -translate-y-1/2 rounded-md bg-primary'>
                4
              </div>
            </a>
          </li>
          <li>
            <a href='/dashboard' className='block w-10 h-10 rounded-lg'>
              <img
                className='w-10 h-10 rounded-lg'
                src='/imgs/profile.jpeg'
                alt='Profile Image'
              />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default ProtectedNav;

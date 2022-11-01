import React from "react";

const Nav = () => {
  return (
    <nav className='fixed flex justify-between w-full px-64 py-8 border-b-2'>
      {/* first part */}
      <div className='flex gap-20'>
        <div>
          <img src='/logo.png' className='w-16' alt='' />
        </div>
        <div className='flex items-center'>
          <input
            className='h-full px-4 rounded-xl bg-[#EDEEF2]'
            type='text'
            placeholder='Search'
          />
        </div>
      </div>
      {/* second part */}
      <ul className='flex items-center gap-12 text-lg'>
        {/* first ul */}
        <div className='flex gap-8'>
          <li>
            <a className='font-semibold' href='/'>
              Home
            </a>
          </li>
          <li>
            <a href='/kamar'>Kamar</a>
          </li>
          <li>
            <a href='/fitur'>Fitur</a>
          </li>
        </div>
        <hr className='w-0.5 h-full bg-slate-200' />
        {/* second ul */}
        <div className='flex gap-8'>
          <li>
            <a href='/login'>Login</a>
          </li>
          <li>
            <a href='/register'>Register</a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;

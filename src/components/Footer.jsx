import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='flex justify-between px-48 py-12 bg-primary'>
      <div className='flex items-center'>
        <img src='/logo-footer.png' className='w-28' alt='' />
      </div>
      <div className='flex gap-10'>
        {/* quick links */}
        <div className='tracking-wide'>
          <p className='font-bold'>Quick Links</p>
          <ul className='text-white'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/kamar'>Kamar</Link>
            </li>
            <li>
              <Link to='/fitur'>Fitur</Link>
            </li>
            <li>
              <Link to='/kontak'>Kontak</Link>
            </li>
          </ul>
        </div>
        {/* authentication */}
        <div className='tracking-wide'>
          <p className='font-bold'>Authentication</p>
          <ul className='text-white'>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Footer = () => {
  const { auth } = useAuth();
  return (
    <footer className='relative flex justify-between px-48 py-12 z-5 bg-primary'>
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
            {auth.id && (
              <li>
                <Link to='/kontak'>Kontak</Link>
              </li>
            )}
          </ul>
        </div>
        {/* authentication */}
        <div className='tracking-wide'>
          <p className='font-bold'>
            {auth.id ? "Dashboard" : "Authentication"}
          </p>
          <ul className='text-white'>
            {!auth.id ? (
              <>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/dashboard'>Profile</Link>
                </li>
                <li>
                  <Link to='/payment'>Payment</Link>
                </li>
                <li>
                  <Link to='/security'>Security</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

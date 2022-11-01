import React from "react";

const Footer = () => {
  return (
    <footer className='flex justify-between px-64 py-8 bg-primary'>
      <div className='flex items-center'>
        <img src='/logo-footer.png' className='w-36' alt='' />
      </div>
      <div className='flex gap-10'>
        {/* quick links */}
        <div className='text-xl tracking-wide'>
          <p className='font-bold'>Quick Links</p>
          <ul className='text-white'>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/kamar'>Kamar</a>
            </li>
            <li>
              <a href='/fitur'>Fitur</a>
            </li>
            <li>
              <a href='/kontak'>Kontak</a>
            </li>
          </ul>
        </div>
        {/* authentication */}
        <div className='text-xl tracking-wide'>
          <p className='font-bold'>Authentication</p>
          <ul className='text-white'>
            <li>
              <a href='/register'>Register</a>
            </li>
            <li>
              <a href='/login'>Login</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
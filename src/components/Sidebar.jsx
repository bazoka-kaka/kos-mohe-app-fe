import React from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FiCreditCard } from "react-icons/fi";
import { BsShield } from "react-icons/bs";

const Sidebar = () => {
  return (
    <nav className='w-1/4'>
      {/* title */}
      <div>
        <h1 className='text-xl'>Settings</h1>
      </div>
      {/* links */}
      <div className='mt-4'>
        <ul className='flex flex-col gap-4'>
          <li>
            <a
              href='/dashboard'
              className='flex items-center gap-2 p-2 border-2 bg-primary bg-opacity-5 rounded-xl border-primary'
            >
              {/* icon */}
              <div className='p-3 text-xl text-white rounded-xl bg-primary'>
                <MdOutlinePersonOutline />
              </div>
              <div>
                <h2 className='text-sm font-semibold'>Akun</h2>
                <p className='text-xs text-slate-500'>Informasi Personal</p>
              </div>
            </a>
          </li>
          <li>
            <a
              href='/dashboard'
              className='flex items-center gap-2 p-2 border-[1px] rounded-xl border-slate-200'
            >
              {/* icon */}
              <div className='p-3 text-xl text-slate-500 rounded-xl bg-slate-300'>
                <FiCreditCard />
              </div>
              <div>
                <h2 className='text-sm font-semibold'>Pembayaran</h2>
                <p className='text-xs text-slate-500'>Detail Pembayaran</p>
              </div>
            </a>
          </li>
          <li>
            <a
              href='/security'
              className='flex items-center gap-2 p-2 border-[1px] rounded-xl border-slate-200'
            >
              {/* icon */}
              <div className='p-3 text-xl text-slate-500 rounded-xl bg-slate-300'>
                <BsShield />
              </div>
              <div>
                <h2 className='text-sm font-semibold'>Security</h2>
                <p className='text-xs text-slate-500'>Password, 2FA</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

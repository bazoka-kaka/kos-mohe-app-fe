import React from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FiCreditCard } from "react-icons/fi";
import { BsShield } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const links = [
    {
      path: "/dashboard",
      icon: <MdOutlinePersonOutline />,
      title: "Akun",
      description: "Informasi Personal",
    },
    {
      path: "/payment",
      icon: <FiCreditCard />,
      title: "Pembayaran",
      description: "Detail Pembayaran",
    },
    {
      path: "/security",
      icon: <BsShield />,
      title: "Security",
      description: "Password, 2FA",
    },
  ];
  return (
    <nav className='w-1/3'>
      {/* title */}
      <div>
        <h1 className='text-xl'>Settings</h1>
      </div>
      {/* links */}
      <div className='mt-4'>
        <ul className='flex flex-col gap-4'>
          {links.map((link) => {
            if (link.path === location.pathname) {
              return (
                <li>
                  <a
                    href={link.path}
                    className='flex items-center gap-2 p-2 border-2 bg-primary bg-opacity-5 rounded-xl border-primary'
                  >
                    {/* icon */}
                    <div className='p-3 text-xl text-white rounded-xl bg-primary'>
                      {link.icon}
                    </div>
                    <div>
                      <h2 className='text-sm font-semibold'>{link.title}</h2>
                      <p className='text-xs text-slate-500'>
                        {link.description}
                      </p>
                    </div>
                  </a>
                </li>
              );
            } else {
              return (
                <li>
                  <a
                    href={link.path}
                    className='flex items-center gap-2 p-2 border-[1px] rounded-xl border-slate-200'
                  >
                    {/* icon */}
                    <div className='p-3 text-xl text-slate-500 rounded-xl bg-slate-300'>
                      {link.icon}
                    </div>
                    <div>
                      <h2 className='text-sm font-semibold'>{link.title}</h2>
                      <p className='text-xs text-slate-500'>
                        {link.description}
                      </p>
                    </div>
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

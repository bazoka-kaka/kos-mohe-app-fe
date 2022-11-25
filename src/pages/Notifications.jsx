import React from "react";
import { Link } from "react-router-dom";
import { FaAsterisk } from "react-icons/fa";
import { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      title: "Penyewaan Telah Diverifikasi",
      description: `Pemilik telah melakukan verifikasi pembayaran terhadap penyewaan
              kamar Double Deluxe anda.
              Anda sudah dapat melakukan
              check-in.`,
      link: "/",
    },
    {
      title: "Pembayaran Sukses",
      description: `Anda melakukan pembayaran terhadap pesanan kamar
            Double Deluxe selama 2 bulan. Tunggu verifikasi dari
            pemilik.`,
      link: "/",
    },
    {
      title: "Pesanan Baru Telah Dibuat",
      description: `Anda melakukan penyewaan kamar Double Deluxe selama 2 bulan.
            Lakukan pembayaran sebelum
            10 Desember 2022`,
      link: "/",
    },
  ]);
  return (
    <div className='min-h-[100vh] flex flex-col pt-[85.0667px] px-48'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Notifikasi</h1>
        <button className='font-semibold text-blue-600 transition duration-200 hover:text-red-600'>
          Sudah dibaca
        </button>
      </div>
      <div className='flex flex-col mt-4 gap-[1px]'>
        {notifications.map((notification, i) => (
          <div key={i} className='flex gap-4 px-6 py-2 bg-blue-100'>
            <FaAsterisk className='mt-2 text-2xl' />
            <div>
              <h2 className='text-lg font-semibold text-slate-800'>
                {notification.title}
              </h2>
              <p className='mb-2'>{notification.description}</p>
              <Link
                to={notification.link}
                className='text-blue-700 transition duration-200 hover:text-red-500'
              >
                Open Link
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

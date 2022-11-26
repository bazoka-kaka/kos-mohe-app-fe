import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAsterisk } from "react-icons/fa";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const NOTIFICATIONS_URL = "/notifications";

const Notifications = ({ notifications, setNotifications }) => {
  const { auth } = useAuth();
  // const [notifications, setNotifications] = useState([
  //   {
  //     title: "Penyewaan Telah Diverifikasi",
  //     description: `Pemilik telah melakukan verifikasi pembayaran terhadap penyewaan
  //             kamar Double Deluxe anda.
  //             Anda sudah dapat melakukan
  //             check-in.`,
  //     link: "/",
  //   },
  //   {
  //     title: "Pembayaran Sukses",
  //     description: `Anda melakukan pembayaran terhadap pesanan kamar
  //           Double Deluxe selama 2 bulan. Tunggu verifikasi dari
  //           pemilik.`,
  //     link: "/",
  //   },
  //   {
  //     title: "Pesanan Baru Telah Dibuat",
  //     description: `Anda melakukan penyewaan kamar Double Deluxe selama 2 bulan.
  //           Lakukan pembayaran sebelum
  //           10 Desember 2022`,
  //     link: "/",
  //   },
  // ]);

  const [maxi, setMaxi] = useState(4);

  const addMaxi = () => {
    if (maxi < notifications.length) {
      setMaxi((prev) => prev + 4);
    }
  };

  const deleteNotifications = async () => {
    try {
      const response = await axios.delete(NOTIFICATIONS_URL + "/" + auth.id);
      console.log(response?.data);
      setNotifications([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='min-h-[100vh] flex flex-col pt-[85.0667px] pb-6 px-48'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Notifikasi</h1>
        {notifications.length > 0 && (
          <button
            onClick={deleteNotifications}
            className='font-semibold text-blue-600 transition duration-200 hover:text-red-600'
          >
            Sudah dibaca
          </button>
        )}
      </div>
      <div className='flex flex-col mt-4 gap-[1px]'>
        {notifications.length === 0 ? (
          <p>No notifications found!</p>
        ) : (
          notifications.map((notification, i) => {
            if (i < maxi)
              return (
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
              );
          })
        )}
      </div>
      <div className='mt-2'>
        {maxi < notifications.length && (
          <button
            onClick={addMaxi}
            className='px-2 py-1 text-white bg-black rounded-md hover:bg-slate-700'
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default Notifications;

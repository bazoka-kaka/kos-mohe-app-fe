import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AddOrder from "../components/AddOrder";
import axios from "../api/axios";
import UpdateKamar from "../components/UpdateKamar";
import toast from "react-hot-toast";

import handleUsersNotification from "../components/HandleUsersNotification";
import { useRef } from "react";

const KAMAR_URL = "/rooms";

const KamarDetail = ({ room, getUserNotifications, getKamar }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const [src, setSrc] = useState("");

  useEffect(() => {
    setSrc(`http://localhost:3500/rooms/images/${room._id}`);
  }, []);

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const handleDelete = async () => {
    try {
      const result = await axios.delete(KAMAR_URL + "/" + room._id);
      console.log(result?.data);
      getKamar();
      handleUsersNotification(
        auth,
        getUserNotifications,
        errRef,
        setErrMsg,
        `Kamar Telah Dihapus`,
        `Kamar dengan nama ${room.name} telah dihapus.`,
        "/kamar"
      );
      toast.success("Kamar Berhasil Dihapus!");
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* pop up form */}
      {showPopup &&
        (auth?.roles?.includes(5150) ? (
          <UpdateKamar
            getUserNotifications={getUserNotifications}
            room={room}
            setShowPopup={setShowPopup}
            auth={auth}
            getKamar={getKamar}
            setSrc={setSrc}
          />
        ) : (
          <AddOrder
            getUserNotifications={getUserNotifications}
            room={room}
            setShowPopup={setShowPopup}
            auth={auth}
          />
        ))}
      <div className='min-h-[100vh] pt-[85.0667px] px-48 bg-[#EDEEF2]'>
        {/* title */}
        <header className='flex items-center justify-between pt-6'>
          <h1 className='text-4xl'>{room.name}</h1>
          {auth?.roles?.includes(5150) && (
            <button
              onClick={handleDelete}
              className='px-2 py-1 text-white transition duration-200 bg-red-600 rounded-md hover:bg-red-700'
            >
              Hapus Kamar
            </button>
          )}
        </header>
        {/* detail section */}
        <section id='detail' className='flex gap-5 py-6'>
          {/* image detail and buttons */}
          <div className='flex flex-col w-2/3 gap-5 pb-6'>
            {/* image */}
            <img className='rounded-md' src={src} alt={room.name} />
            {/* detail */}
            <div className='p-4 bg-white border-[1.5px] rounded-md flex flex-col gap-2'>
              {/* description */}
              <div>
                <p className='font-semibold'>Deskripsi</p>
                <p className='text-sm text-justify'>{room.description}</p>
              </div>
              {/* features */}
              <div>
                <p className='font-semibold'>Fasilitas</p>
                <ul className='ml-5 text-sm list-disc'>
                  <li>{room.features.ac ? "ac" : "non ac"}</li>
                  <li>kamar mandi {room.features.kmandi}</li>
                  <li>kapasitas {room.features.capacity} orang</li>
                </ul>
              </div>
            </div>
            {/* buttons */}
            <div className='flex gap-5'>
              <button
                type='button'
                onClick={() => {
                  if (auth.id) {
                    setShowPopup(true);
                  } else {
                    navigate("/login");
                  }
                }}
                className='inline-block px-12 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
              >
                {auth?.roles?.includes(5150) ? "Edit" : "Pesan"}
              </button>
              <button
                onClick={() => navigate(-1)}
                className='inline-block px-12 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-black hover:bg-slate-800 rounded-2xl'
              >
                Kembali
              </button>
            </div>
          </div>
          {/* pricing & kontak penjual */}
          <div className='w-1/3'>
            {/* pricing */}
            <div className='pl-4 pr-20 py-6 bg-white border-[1px] border-slate-300 rounded-sm'>
              <h2 className='text-3xl'>Rp {room.price}</h2>
              <p>{room.name}</p>
              <p className='mt-4 text-sm'>
                <FaUserAlt className='inline-block mb-1' />{" "}
                {room.features.capacity} Orang
              </p>
            </div>
            {/* kontak */}
            <Link
              className='block mt-2 py-1 text-center bg-white rounded-sm border-[1.5px] border-slate-700'
              to='/contact'
            >
              Kontak Penjual
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default KamarDetail;

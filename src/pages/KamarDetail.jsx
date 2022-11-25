import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const KamarDetail = ({ room }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='min-h-[100vh] pt-[85.0667px] px-48 bg-[#EDEEF2]'>
        {/* title */}
        <header className='pt-6'>
          <h1 className='text-4xl'>{room.name}</h1>
        </header>
        {/* detail section */}
        <section id='detail' className='flex gap-5 py-6'>
          {/* image detail and buttons */}
          <div className='flex flex-col w-2/3 gap-5 pb-6'>
            {/* image */}
            <img
              className='rounded-md'
              src={`http://localhost:3500/rooms/images/${room._id}`}
              alt={room.name}
            />
            {/* detail */}
            <div className='p-4 bg-white border-[1.5px] rounded-md'>
              <h2 className='font-semibold'>Detail</h2>
              <ul className='ml-5 text-sm list-disc'>
                <li>{room.features.ac ? "ac" : "non ac"}</li>
                <li>kamar mandi {room.features.kmandi}</li>
                <li>kapasitas {room.features.capacity} orang</li>
              </ul>
            </div>
            {/* buttons */}
            <div className='flex gap-5'>
              <Link
                to={`/kamar/${room.name}`}
                className='inline-block px-12 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
              >
                Pesan
              </Link>
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

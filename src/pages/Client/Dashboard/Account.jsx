import React from "react";
import Footer from "../../../components/Footer";
import ProtectedNav from "../../../components/ProtectedNav";
import Sidebar from "../../../components/Sidebar";

const Account = () => {
  return (
    <>
      <ProtectedNav />
      <div className='min-h-[100vh] pt-[85.0667px] flex px-48'>
        <Sidebar />
        <section className='w-2/3 pl-6'>
          {/* title */}
          <h1 className='text-xl'>Account</h1>
          {/* content */}
          <div className='p-4 mt-4 border-[1.5px] rounded-lg border-slate-200'>
            <h2 className='font-semibold text-slate-700'>Informasi Personal</h2>
            {/* change profile picture */}
            <div className='mt-4'>
              <h3 className='text-sm'>Avatar</h3>
              <div className='flex items-center gap-6 mt-2'>
                <img
                  className='w-24 rounded-lg'
                  src='/imgs/profile.jpeg'
                  alt='Profile Picture'
                />
                <button className='px-3 py-2 text-sm font-semibold border-2 rounded-md border-primary text-primary'>
                  Ubah
                </button>
                <button className='px-3 py-2 text-sm font-semibold text-slate-500'>
                  Hapus
                </button>
              </div>
            </div>
            {/* change profile information */}
            <form className='flex flex-col gap-8 mt-4'>
              {/* first part */}
              <div className='flex gap-2'>
                <div className='flex flex-col w-1/2 gap-1'>
                  <label className='text-sm' htmlFor='firstname'>
                    Nama Depan
                  </label>
                  <input
                    className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                    type='text'
                    placeholder='Min. 3 karakter'
                  />
                </div>
                <div className='flex flex-col w-1/2 gap-1'>
                  <label className='text-sm' htmlFor='firstname'>
                    Nama Belakang
                  </label>
                  <input
                    className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                    type='text'
                    placeholder='Min. 3 karakter'
                  />
                </div>
              </div>
              {/* second part */}
              <div className='flex gap-2'>
                <div className='flex flex-col w-1/2 gap-1'>
                  <label className='text-sm' htmlFor='firstname'>
                    Email
                  </label>
                  <input
                    className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                    type='text'
                    placeholder='example@gmail.com'
                  />
                </div>
                <div className='flex flex-col w-1/2 gap-1'>
                  <label className='text-sm' htmlFor='firstname'>
                    Nomor Telepon
                  </label>
                  <input
                    className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                    type='text'
                    placeholder='(08xx)xxxxxxxx'
                  />
                </div>
              </div>
            </form>
            {/* notifications */}
            <div className='mt-6 mb-4'>
              <h2 className='font-semibold text-slate-700'>Notifikasi</h2>
              <ul className='flex flex-col gap-2 mt-2 text-sm'>
                <li className='flex gap-2 select-none'>
                  <input type='checkbox' name='offer' id='offer' />{" "}
                  <label htmlFor='offer'>Tawaran Menarik</label>
                </li>
                <li className='flex gap-2 select-none'>
                  <input type='checkbox' name='status' id='status' />{" "}
                  <label htmlFor='status'>Status Pemesanan</label>
                </li>
                <li className='flex gap-2 select-none'>
                  <input type='checkbox' name='update' id='update' />{" "}
                  <label htmlFor='update'>Update Kos</label>
                </li>
              </ul>
            </div>
            {/* cta */}
            <div className='flex justify-between mt-8'>
              {/* first part */}
              <div>
                <button className='p-2 text-sm font-semibold text-red-400 border-2 border-red-400 rounded-md'>
                  Log out
                </button>
              </div>
              {/* second part */}
              <div className='flex gap-4'>
                <button className='p-2 text-sm font-semibold border-2 rounded-md border-slate-400 text-slate-400'>
                  Lupakan Perubahan
                </button>
                <button className='p-2 text-sm font-semibold text-white border-2 rounded-md bg-primary'>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Account;

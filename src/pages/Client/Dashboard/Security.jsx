import React from "react";
import Sidebar from "../../../components/Sidebar";

const Security = () => {
  return (
    <>
      <div className='min-h-[100vh] pt-[85.0667px] flex px-48'>
        <Sidebar />
        <section className='w-2/3 pl-6'>
          {/* title */}
          <h1 className='text-xl'>Security</h1>
          {/* content */}
          <div className='p-4 mt-4 border-[1.5px] rounded-lg border-slate-200'>
            <h2 className='font-semibold text-slate-700'>Ganti Password</h2>
            {/* change password */}
            <form className='flex flex-col gap-2 mt-4'>
              <div className='flex flex-col w-1/2 gap-1'>
                <label className='text-sm' htmlFor='old-pass'>
                  Password Lama
                </label>
                <input
                  className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                  type='password'
                  id='old-pass'
                  placeholder='xxxxxxxx'
                />
              </div>
              <div className='flex flex-col w-1/2 gap-1'>
                <label className='text-sm' htmlFor='new-pass'>
                  Password Baru
                </label>
                <input
                  className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                  type='password'
                  id='new-pass'
                  placeholder='xxxxxxxx'
                />
              </div>
              <div className='flex flex-col w-1/2 gap-1'>
                <label className='text-sm' htmlFor='new-pass-confirm'>
                  Konfirmasi Password Baru
                </label>
                <input
                  className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                  type='password'
                  id='new-pass-confirm'
                  placeholder='xxxxxxxx'
                />
              </div>
            </form>

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
    </>
  );
};

export default Security;

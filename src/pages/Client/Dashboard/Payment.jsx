import React from "react";
import Sidebar from "../../../components/Sidebar";

const Payment = () => {
  return (
    <>
      <div className='min-h-[100vh] pt-[85.0667px] flex px-48'>
        <Sidebar />
        <section className='w-2/3 pl-6'>
          {/* title */}
          <h1 className='text-xl'>Pembayaran</h1>
          {/* content */}
          <div className='p-4 mt-4 border-[1.5px] rounded-lg border-slate-200'>
            <h2 className='font-semibold text-slate-700'>
              Pembayaran Belum Lunas
            </h2>
            {/* cards */}
            <div className='flex flex-col mt-6'>
              <div className='flex px-12 py-2 rounded-xl justify-between border-[1px] border-slate-200'>
                <div className='flex flex-col gap-2'>
                  <h3 className='font-semibold text-slate-700'>Deluxe</h3>
                  <p className='text-sm text-slate-500'>2 Bulan x Rp 900.000</p>
                  <p className='text-sm text-slate-500'>
                    1 Juli 2022 - 31 Agustus 2022
                  </p>
                </div>
                <div className='flex flex-col items-end justify-center'>
                  <button className='px-4 py-1 text-white bg-black rounded-md'>
                    Bayar
                  </button>
                  <p className='mt-2 text-sm'>Total: Rp 1.800.000</p>
                </div>
              </div>
            </div>

            {/* cta */}
            <div className='flex justify-between mt-8'>
              {/* first part */}
              <div>
                <button className='p-2 text-sm font-semibold text-red-400 border-2 border-red-400 rounded-md'>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Payment;

import React from "react";

const Contact = () => {
  return (
    <section className='min-h-[100vh] flex flex-col justify-center pt-[85.0667px] px-48'>
      {/* title */}
      <h1 className='text-4xl'>Kontak</h1>
      <form action='' className='flex flex-col gap-2 mt-4'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='fullname'>Nama Lengkap</label>
          <input
            className='p-2 border-2 rounded-md border-slate-700'
            type='text'
            placeholder='Min. 3 Karakter'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='fullname'>No. Telpon</label>
          <input
            className='p-2 border-2 rounded-md border-slate-700'
            type='text'
            placeholder='08xxxxxxxxxx'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='fullname'>Email</label>
          <input
            className='p-2 border-2 rounded-md border-slate-700'
            type='text'
            placeholder='example@test.com'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='message'>Pesan</label>
          <textarea
            id='message'
            className='h-48 p-2 border-2 rounded-md border-slate-700'
            placeholder='Masukkan pesan anda di sini'
          />
        </div>
        <div className='mt-4'>
          <button className='inline-block px-8 py-2 font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;

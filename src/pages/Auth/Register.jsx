import React from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const Register = () => {
  return (
    <>
      <Nav />
      <div className='min-h-[100vh] pt-[69.53px] flex'>
        {/* left */}
        <div className='flex flex-col justify-center w-2/5 px-24 py-12'>
          {/* header */}
          <header>
            <h1 className='text-6xl font-semibold text-slate-700'>Register</h1>
            <p className='mt-4 text-lg text-slate-500'>Buat akun baru</p>
          </header>
          {/* form */}
          <form
            className='flex flex-col gap-4 mt-2'
            action='/handle/register'
            method='post'
          >
            <div className='flex flex-col gap-2'>
              <label htmlFor='#name'>Nama Lengkap</label>
              <input
                className='p-2 border-2 border-gray-200 rounded-md'
                type='text'
                id='name'
                name='fullname'
                placeholder='min. 3 karakter'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='#email'>Email</label>
              <input
                className='p-2 border-2 border-gray-200 rounded-md'
                type='email'
                id='email'
                name='email'
                placeholder='name@example.com'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='#password'>Password</label>
              <input
                className='p-2 border-2 border-gray-200 rounded-md'
                type='password'
                id='password'
                name='password'
                placeholder='min. 8 karakter'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='#retype-password'>Ketik Ulang Password</label>
              <input
                className='p-2 border-2 border-gray-200 rounded-md'
                type='password'
                id='retype-password'
                name='retype-password'
                placeholder='min. 8 karakter'
              />
            </div>

            <div className='flex gap-2'>
              <input
                className='w-5 border-4 border-gray-200'
                type='checkbox'
                name='remember-acc'
                id='#remember-acc'
              />
              <label htmlFor='#remember-acc'>Ingat akun</label>
            </div>
          </form>
          {/* button */}
          <button
            className='inline-block w-full px-8 py-2 mt-8 font-semibold text-white transition-colors duration-200 rounded-md shadow-xl hover:bg-primary-light bg-primary'
            type='submit'
          >
            Register
          </button>
          <p className='mt-4 text-center'>
            Sudah punya akun?{" "}
            <a
              className='transition duration-200 text-primary hover:text-primary-light'
              href='login'
            >
              Login
            </a>
          </p>
        </div>
        {/* right */}
        <div className='flex items-center justify-center w-3/5 bg-primary-light'>
          <div className='flex flex-col items-center'>
            {/* image card */}
            <a
              href='/kamar/deluxe'
              className='p-4 transition duration-200 bg-white rounded-lg shadow-2xl hover:-translate-y-1 w-80'
            >
              {/* image */}
              <img
                className='rounded-lg'
                src='/imgs/kamar/deluxe.png'
                alt='Kamar Deluxe'
              />
              {/* text */}
              <div className='mt-2'>
                {/* title */}
                <h2 className='font-semibold'>Deluxe Room</h2>
                {/* description */}
                <p className='text-xs text-slate-600'>
                  Kamar yang dilengkapi dengan Air Conditioner, berkapasitas 1
                  orang , dekat dengan jendela.
                </p>
                {/* price */}
                <p className='mt-2 text-xl font-bold'>Rp 850.000</p>
              </div>
            </a>
            {/* text explanation */}
            <div className='w-2/3 mt-12 text-center'>
              <h1 className='text-3xl font-semibold text-white'>
                Kos Berkualitas
              </h1>
              <p className='mt-3 text-sm text-slate-200'>
                Semua kamar di Kos Mohe bersih, berkualitas dan memiliki harga
                yang pas sesuai dengan kebutuhan penyewa.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

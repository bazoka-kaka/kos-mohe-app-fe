import { CiUser } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Kamar = ({ kamar }) => {
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* pop up form */}
      {showPopup && (
        <>
          <div className='absolute top-0 z-10 left-0 w-full min-h-[calc(100vh+85.0667px)] bg-black opacity-30'></div>
          <div className='absolute z-20 w-full flex items-center justify-center min-h-[calc(100vh+85.0667px)]'>
            <div className='w-1/2 px-8 py-6 bg-white border-2 rounded-md border-slate-700'>
              <h1 className='text-3xl font-semibold'>Tambahkan Kamar</h1>
              <form className='flex flex-col gap-2 mt-4'>
                <div className='flex flex-col gap-[1.5px]'>
                  <label htmlFor='nama'>Nama Kamar</label>
                  <input
                    className='p-1 border-2 rounded-md border-slate-700'
                    type='text'
                    placeholder='Min. 3 karakter'
                  />
                </div>
                <div className='flex flex-col gap-[1.5px]'>
                  <label htmlFor='nama'>Harga Kamar</label>
                  <input
                    className='p-1 border-2 rounded-md border-slate-700'
                    type='text'
                    placeholder='Hanya masukkan angka'
                  />
                </div>
                <div className='flex flex-col gap-[1.5px]'>
                  <label htmlFor='nama'>Jumlah Kamar</label>
                  <input
                    className='p-1 border-2 rounded-md border-slate-700'
                    type='text'
                    placeholder='Hanya masukkan angka'
                  />
                </div>
                <div className='flex flex-col gap-[1.5px]'>
                  <label htmlFor='nama'>Deskripsi Kamar</label>
                  <input
                    className='p-1 border-2 rounded-md border-slate-700'
                    type='text'
                    placeholder='Opsional, Min. 3 karakter'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='gambar'>Gambar Kamar</label>
                  <input type='file' id='gambar' />
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='font-semibold'>Fitur Kamar</p>
                  <div className='grid grid-cols-2 grid-row-3'>
                    <div className='flex gap-4'>
                      <p>Ber-AC?</p>
                      <div className='flex gap-2'>
                        <div>
                          <input type='radio' id='ac-ya' name='ac' value='ya' />{" "}
                          <label htmlFor='ac-ya'>Ya</label>
                        </div>
                        <div>
                          <input
                            type='radio'
                            id='ac-tidak'
                            name='ac'
                            value='tidak'
                            checked
                          />{" "}
                          <label htmlFor='ac-tidak'>Tidak</label>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <p>Kamar Mandi</p>
                      <div className='flex gap-2'>
                        <div>
                          <input
                            type='radio'
                            id='dalam'
                            name='kamar-mandi'
                            value='dalam'
                          />{" "}
                          <label htmlFor='dalam'>Dalam</label>
                        </div>
                        <div>
                          <input
                            type='radio'
                            id='luar'
                            name='kamar-mandi'
                            value='luar'
                            checked
                          />{" "}
                          <label htmlFor='luar'>Luar</label>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <p>Kapasitas Kamar</p>
                      <div className='flex gap-2'>
                        <div>
                          <input
                            type='radio'
                            id='satu'
                            name='kapasitas-kamar'
                            value='satu'
                            checked
                          />{" "}
                          <label htmlFor='satu'>1 orang</label>
                        </div>
                        <div>
                          <input
                            type='radio'
                            id='dua'
                            name='kapasitas-kamar'
                            value='dua'
                          />{" "}
                          <label htmlFor='dua'>2 orang</label>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <p>Featured?</p>
                      <div className='flex gap-2'>
                        <div>
                          <input
                            type='radio'
                            id='featured-ya'
                            name='featured'
                            value='ya'
                          />{" "}
                          <label htmlFor='featured-ya'>Ya</label>
                        </div>
                        <div>
                          <input
                            type='radio'
                            id='featured-no'
                            name='featured'
                            value='tidak'
                            checked
                          />{" "}
                          <label htmlFor='featured-no'>Tidak</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-2'>
                  <button className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-black hover:bg-slate-700 rounded-2xl'>
                    Simpan
                  </button>
                  <button
                    onClick={handleCancel}
                    className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-red-500 hover:bg-red-400 rounded-2xl'
                  >
                    Batalkan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <div className='min-h-[100vh] pt-[85.0667px] px-48'>
        {/* header */}
        <header className='flex items-center gap-4 pt-6'>
          {/* title */}
          <h1 className='text-3xl'>Kamar Kos Mohe</h1>
          {auth?.roles?.includes(5150) && (
            <button
              onClick={() => setShowPopup(true)}
              className='flex items-center px-4 py-1 font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
            >
              Tambah Kamar
            </button>
          )}
        </header>
        <section id='kamar' className='py-6'>
          {/* content */}
          <div className='grid grid-cols-3 pb-6 gap-x-4 gap-y-6'>
            {kamar.map((item, i) => (
              <Link
                key={i}
                to={item.url}
                className='duration-75 border-[1px] transform rounded-2xl hover:scale-[101%]'
              >
                <div className='relative'>
                  <img
                    src={`${item.img}`}
                    alt={`${item.title}`}
                    className='rounded-t-2xl'
                  />
                  {item.featured && (
                    <div className='absolute top-[1px] right-[1px] px-2 py-1 text-sm text-white bg-primary rounded-bl-2xl rounded-tr-2xl'>
                      Featured
                    </div>
                  )}
                </div>
                <div className='p-4'>
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                  <p className='text-sm'>
                    <CiUser className='inline' /> {item.people} orang{" "}
                    <BsDot className='inline' /> Rp {item.price}
                  </p>
                  <ul className='flex flex-wrap gap-2 mt-5 text-sm'>
                    {item.features.map((feature, i) => (
                      <li key={i} className='px-3 py-1 bg-[#EDEEF2] rounded-xl'>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Kamar;

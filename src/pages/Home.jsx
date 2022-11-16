import React from "react";
import { CiUser } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";

const Home = ({ kamar, fasilitas }) => {
  return (
    <>
      <div className='min-h-[100vh] pt-[85.0667px] px-48'>
        {/* header */}
        <header className='py-6'>
          {/* title */}
          <h1 className='text-3xl'>Selamat Datang di Kos Mohe</h1>
          {/* diskon */}
          <div className='flex gap-8 mt-6'>
            <div className='w-1/2 p-5 bg-[#F3F4FF] rounded-2xl'>
              <h2 className='text-xl'>Kamar Deluxe</h2>
              <h3 className='mt-2 text-4xl font-semibold text-primary'>
                20% OFF
              </h3>
              <p className='mt-8 text-sm text-[#83859C]'>1 - 30 Januari 2023</p>
            </div>
            <div className='w-1/2 p-5 bg-[#FFF3ED] rounded-2xl'>
              <h2 className='text-xl'>Kamar Reguler</h2>
              <h3 className='mt-2 text-4xl font-semibold text-[#FD6D22]'>
                10% OFF
              </h3>
              <p className='mt-8 text-sm text-[#83859C]'>1 - 15 Januari 2023</p>
            </div>
          </div>
        </header>
        {/* kamar kos */}
        <section id='kamar' className='py-6'>
          {/* title */}
          <h2 className='text-xl'>Kamar Kos Mohe</h2>
          {/* content */}
          <div className='grid grid-cols-3 mt-4 gap-x-4 gap-y-6'>
            {kamar.map((item, i) => {
              if (i < 3) {
                return (
                  <Link
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
                          <li
                            key={i}
                            className='px-3 py-1 bg-[#EDEEF2] rounded-xl'
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
          {/* learn more button */}
          <Link
            to='/kamar'
            className='inline-block px-8 py-2 mt-8 font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
          >
            Learn More
          </Link>
        </section>
        <section id='fasilitas' className='pt-8 pb-16'>
          {/* title */}
          <h2 className='text-xl'>Fasilitas Kos Mohe</h2>
          {/* content */}
          <div className='flex flex-wrap gap-8 mt-6'>
            {fasilitas.map((item, i) => {
              if (i < 2) {
                return (
                  <div key={i} className='flex gap-4'>
                    <img
                      className='w-64 rounded-2xl'
                      src={`${item.img}`}
                      alt={`${item.title}`}
                    />
                    <div>
                      <h3 className='text-lg font-semibold'>{item.title}</h3>
                      <p className='text-sm'>{item.description}</p>
                      {item.title === "Kamar Tidur" ? (
                        <ul className='grid grid-cols-2 grid-rows-4 ml-5 text-sm list-disc'>
                          {item.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      ) : (
                        <ul className='ml-5 text-sm list-disc'>
                          {item.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          {/* learn more button */}
          <Link
            to='/fitur'
            className='inline-block px-8 py-2 mt-8 font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
          >
            Learn More
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;

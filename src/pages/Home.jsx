import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import MultiCarousel from "../components/MultiCarousel";
import useAuth from "../hooks/useAuth";
import AddDiscounts from "../components/AddDiscount";

const Home = ({
  kamar,
  facilities,
  getUserNotifications,
  discounts,
  getDiscounts,
}) => {
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* pop up form */}
      {showPopup && (
        <AddDiscounts
          getUserNotifications={getUserNotifications}
          getDiscounts={getDiscounts}
          setShowPopup={setShowPopup}
          auth={auth}
          rooms={kamar}
        />
      )}
      <div className='min-h-[100vh] pt-[85.0667px] px-48'>
        {/* header */}
        <header className='py-6'>
          {/* title */}
          <h1 className='text-3xl font-semibold'>Selamat Datang di Kos Mohe</h1>
          {/* diskon */}
          <MultiCarousel total={2}>
            {discounts.map((discount, i) =>
              discount.kamar.name.includes("Deluxe") ? (
                <div className='w-[calc(50%-10px)] text-left p-5 bg-[#F3F4FF] rounded-2xl'>
                  <h2 className='text-xl'>{discount.kamar.name}</h2>
                  <h3 className='mt-2 text-4xl font-semibold text-primary'>
                    {discount.cut}% OFF
                  </h3>
                  <p className='mt-8 text-sm text-[#83859C]'>
                    {discount.beginDate.substring(0, 10)} s.d{" "}
                    {discount.endDate.substring(0, 10)}
                  </p>
                </div>
              ) : (
                <div className='text-left w-[calc(50%-10px)] p-5 bg-[#FFF3ED] rounded-2xl'>
                  <h2 className='text-xl'>{discount.kamar.name}</h2>
                  <h3 className='mt-2 text-4xl font-semibold text-[#FD6D22]'>
                    {discount.cut}% OFF
                  </h3>
                  <p className='mt-8 text-sm text-[#83859C]'>
                    {discount.beginDate.substring(0, 10)} s.d{" "}
                    {discount.endDate.substring(0, 10)}
                  </p>
                </div>
              )
            )}
          </MultiCarousel>
          {auth?.roles?.includes(5150) && (
            <button
              type='button'
              onClick={() => setShowPopup(true)}
              className='px-2 mt-3 text-white transition duration-200 rounded-md bg-primary hover:bg-primary-light'
            >
              Add Discount
            </button>
          )}
        </header>
        {/* about */}
        <section id='about' className='py-6 mt-2'>
          <h2 className='text-xl font-semibold'>About Kos Mohe</h2>
          <p className='mt-2 text-justify'>
            Kos mohe menawarkan penginapan kos wanita yang nyaman dan aman untuk
            ditinggali. Harganya pun pas sesuai dengan kebutuhan pelanggan. Kos
            ini sangat strategis karena lokasinya yang terletak dekat dengan
            berbagai instansi pendidikan, rumah sakit, pasar, warung, serta
            berbagai tempat krusial lainnya. Kos ini juga sangat sejuk dan
            rindang, dipenuhi dengan berbagai tanaman serta terletak di
            perkampungan yang asri yang merupakan salah satu perkampungan paling
            hijau di Kota Malang.
          </p>
        </section>
        {/* kamar kos */}
        <section id='kamar' className='py-6'>
          {/* title */}
          <h2 className='text-xl font-semibold'>Kamar Kos Mohe</h2>
          <p>Berbagai jenis kamar yang terdapat di Kos Mohe</p>
          {/* content */}
          <div className='grid grid-cols-3 mt-4 gap-x-4 gap-y-6'>
            {kamar.length === 0 ? (
              <p>Loading Data...</p>
            ) : (
              kamar.map((item, i) => {
                if (i < 3) {
                  return (
                    <Link
                      key={i}
                      to={`/kamar/${item.name}`}
                      className='duration-75 border-[1px] transform rounded-2xl hover:scale-[101%]'
                    >
                      <div className='relative'>
                        <img
                          src={`http://localhost:3500/rooms/images/${item._id}`}
                          alt={`${item.name}`}
                          className='rounded-t-2xl'
                        />
                        {item.features.featured && (
                          <div className='absolute top-[1px] right-[1px] px-2 py-1 text-sm text-white bg-primary rounded-bl-2xl rounded-tr-2xl'>
                            Featured
                          </div>
                        )}
                      </div>
                      <div className='p-4'>
                        <h3 className='text-lg font-semibold'>{item.name}</h3>
                        <p className='text-sm'>
                          <CiUser className='inline' /> {item.features.capacity}{" "}
                          orang <BsDot className='inline' /> Rp {item.price}
                        </p>
                        <ul className='flex flex-wrap gap-2 mt-5 text-sm'>
                          {item.features.ac && (
                            <li className='px-3 py-1 bg-[#EDEEF2] rounded-xl'>
                              ac
                            </li>
                          )}
                          <li className='px-3 py-1 bg-[#EDEEF2] rounded-xl'>
                            {item.features.capacity} orang
                          </li>
                          <li className='px-3 py-1 bg-[#EDEEF2] rounded-xl'>
                            kamar mandi {item.features.kmandi}
                          </li>
                        </ul>
                      </div>
                    </Link>
                  );
                }
              })
            )}
          </div>
          {/* learn more button */}
          <Link
            to='/kamar'
            className='inline-block px-8 py-2 mt-4 font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
          >
            Learn More
          </Link>
        </section>
        {/* fasilitas kos */}
        <section id='fasilitas' className='pt-6'>
          {/* title */}
          <h2 className='text-xl font-semibold'>Fasilitas Kos Mohe</h2>
          <p>Berbagai fasilitas yang terdapat di Kos Mohe</p>
          {/* content */}
          {facilities.length === 0 ? (
            <p className='mt-6'>Loading Data...</p>
          ) : (
            <div className='flex flex-wrap gap-4 mt-6'>
              {facilities.map((facility, i) => {
                if (i < 2) {
                  return (
                    <div
                      key={i}
                      className='flex w-[calc(50%-8px)] border-[1px] border-slate-200 rounded-xl'
                    >
                      <img
                        className='w-64 rounded-l-2xl'
                        src={`http://localhost:3500/facilities/images/${facility._id}`}
                        alt={`${facility.name}`}
                      />
                      <div className='flex flex-col p-4'>
                        <h3 className='text-lg font-semibold'>
                          {facility.name}
                        </h3>
                        <p className='text-sm'>{facility.description}</p>
                        {facility.features[0].split(",").length > 3 ? (
                          <ul className='grid grid-cols-2 grid-rows-4 ml-5 text-sm list-disc'>
                            {facility.features[0]
                              .split(",")
                              .map((feature, i) => (
                                <li key={i}>{feature}</li>
                              ))}
                          </ul>
                        ) : facility.features[0] !== "" ? (
                          <ul className='ml-5 text-sm list-disc'>
                            {facility.features[0]
                              .split(",")
                              .map((feature, i) => (
                                <li key={i}>{feature}</li>
                              ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}

          {/* learn more button */}
          <Link
            to='/fitur'
            className='inline-block px-8 py-2 mt-4 font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
          >
            Learn More
          </Link>
        </section>
        <div className='mt-16 mb-16'>
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
          >
            <div>
              <img
                className='h-[300px] object-cover object-top'
                src='/imgs/jemuran.png'
                alt='jemuran'
              />
            </div>
            <div>
              <img
                className='h-[300px] object-cover object-center'
                src='/imgs/dapur.png'
                alt='Dapur'
              />
            </div>
            <div>
              <img
                className='h-[300px] object-cover object-center'
                src='/imgs/reguler.png'
                alt='reguler'
              />
            </div>
            <div>
              <img
                className='h-[300px] object-cover object-center'
                src='/imgs/santai.png'
                alt='santai'
              />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { CiUser } from "react-icons/ci";
import { BsDot } from "react-icons/bs";

const App = () => {
  const [kamar, setKamar] = useState([
    {
      title: "Kamar Double Deluxe",
      img: "/imgs/kamar/double.png",
      people: 2,
      price: 1200000,
      features: ["2 Orang", "AC", "Kamar mandi dalam"],
    },
    {
      title: "Kamar Deluxe",
      img: "/imgs/kamar/deluxe.png",
      people: 1,
      price: 900000,
      features: ["1 Orang", "AC", "Kamar mandi dalam"],
    },
    {
      title: "Kamar Double Reguler",
      img: "/imgs/kamar/double.png",
      people: 2,
      price: 1000000,
      features: ["2 Orang", "Kamar mandi dalam"],
    },
    {
      title: "Kamar Reguler",
      img: "/imgs/kamar/reguler.png",
      people: 1,
      price: 700000,
      features: ["1 Orang", "Kamar mandi dalam"],
    },
  ]);
  const [fasilitas, setFasilitas] = useState([
    {
      title: "Kamar Tidur",
      img: "/imgs/fasilitas/kamar.png",
      description: "Ukuran kamar 3x3 meter Termasuk listrik",
      features: [
        "Kasur",
        "Bantal",
        "Ventilasi",
        "Jendela",
        "Lemari Baju",
        "Kursi",
        "Meja",
        "Cleaning Service",
      ],
    },
    {
      title: "Kamar Mandi",
      img: "/imgs/fasilitas/shower.png",
      description: "",
      features: [
        "K. Mandi Dalam",
        "K. Mandi Luar",
        "Kloset Duduk",
        "Kloset Jongkok",
        "Ember dan Gayung",
        "Shower",
      ],
    },
  ]);
  return (
    <div>
      <Nav />
      <div className='min-h-[100vh] pt-[133.383px] px-64'>
        {/* header */}
        <header className='py-8'>
          {/* title */}
          <h1 className='text-4xl font-semibold'>Selamat Datang di Kos Mohe</h1>
          {/* diskon */}
          <div className='flex gap-10 mt-10'>
            <div className='w-1/2 p-5 bg-[#F3F4FF] rounded-2xl'>
              <h2 className='text-2xl'>Kamar Deluxe</h2>
              <h3 className='mt-2 text-5xl font-semibold text-primary'>
                20% OFF
              </h3>
              <p className='mt-10 text-[#83859C]'>1 - 30 Januari 2023</p>
            </div>
            <div className='w-1/2 p-5 bg-[#FFF3ED] rounded-2xl'>
              <h2 className='text-2xl'>Kamar Reguler</h2>
              <h3 className='mt-2 text-5xl font-semibold text-[#FD6D22]'>
                10% OFF
              </h3>
              <p className='mt-10 text-[#83859C]'>1 - 15 Januari 2023</p>
            </div>
          </div>
        </header>
        {/* kamar kos */}
        <section id='kamar' className='py-8'>
          {/* title */}
          <h2 className='text-2xl'>Kamar Kos Mohe</h2>
          {/* content */}
          <div className='grid grid-cols-3 mt-6 gap-x-5 gap-y-8'>
            {kamar.map((item) => (
              <div className='border-[1px] rounded-2xl'>
                <div>
                  <img
                    src={`${item.img}`}
                    alt={`${item.title}`}
                    className='rounded-t-2xl'
                  />
                </div>
                <div className='p-5'>
                  <h3 className='text-xl font-semibold'>{item.title}</h3>
                  <p>
                    <CiUser className='inline' /> {item.people} orang{" "}
                    <BsDot className='inline' /> Rp {item.price}
                  </p>
                  <ul className='flex gap-2 mt-5'>
                    {item.features.map((feature) => (
                      <li className='px-3 py-1 bg-[#EDEEF2] rounded-xl'>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {/* learn more button */}
          <a
            href='/kamar'
            className='inline-block px-10 py-3 mt-8 text-lg font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
          >
            Learn More
          </a>
        </section>
        <section id='fasilitas' className='pt-8 pb-16'>
          {/* title */}
          <h2 className='text-2xl'>Fasilitas Kos Mohe</h2>
          {/* content */}
          <div className='grid grid-cols-2 mt-6 gap-x-16'>
            {fasilitas.map((item) => (
              <div className='flex gap-5'>
                <img
                  className='rounded-2xl'
                  src={`${item.img}`}
                  alt={`${item.title}`}
                />
                <div>
                  <h3 className='text-2xl font-semibold'>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.title == "Kamar Tidur" ? (
                    <ul className='grid grid-cols-2 grid-rows-4 ml-5 list-disc'>
                      {item.features.map((feature) => (
                        <li>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul className='ml-5 list-disc'>
                      {item.features.map((feature) => (
                        <li>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* learn more button */}
          <a
            href='/fasilitas'
            className='inline-block px-10 py-3 mt-8 text-lg font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
          >
            Learn More
          </a>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default App;

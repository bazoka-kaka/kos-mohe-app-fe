import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Nav />
      <div className='h-[100vh] pt-[133.383px] px-64'>
        {/* header */}
        <header className='py-8'>
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
          {/* kamar kos */}
        </header>
      </div>
      <Footer />
    </div>
  );
};

export default App;

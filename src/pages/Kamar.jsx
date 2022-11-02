import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const Kamar = () => {
  return (
    <>
      <Nav />
      <div className='min-h-[100vh] pt-[85.0667px] px-48'>
        {/* header */}
        <header className='py-6'>
          {/* title */}
          <h1 className='text-3xl'>Kamar Kos Mohe</h1>
        </header>
      </div>
      <Footer />
    </>
  );
};

export default Kamar;

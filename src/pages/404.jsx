import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const NotFound = () => {
  return (
    <>
      <Nav />
      <div className='min-h-[100vh] pt-[85.0667px] px-48 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-6'>
          <h1 className='text-4xl'>404 Page Not Found!</h1>
          <div>
            <a
              href='/'
              className='inline px-12 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
            >
              Home
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;

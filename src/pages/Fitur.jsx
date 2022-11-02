import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

const Fitur = ({ fasilitas }) => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <div className='min-h-[100vh] pt-[85.0667px] flex flex-col items-center'>
        {/* header */}
        <header className='pt-6'>
          {/* title */}
          <h1 className='text-3xl'>Fitur Kos Mohe</h1>
        </header>
        <section id='konten' className='py-6 mt-4'>
          {/* content */}
          <div className='flex flex-col pb-6 gap-y-6'>
            {fasilitas.map((item) => (
              <div className='flex gap-4'>
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
                      {item.features.map((feature) => (
                        <li>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul className='ml-5 text-sm list-disc'>
                      {item.features.map((feature) => (
                        <li>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate(-1)}
            className='inline-block px-12 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-black hover:bg-slate-800 rounded-2xl'
          >
            Kembali
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Fitur;

import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import AddFacility from "../components/AddFacility";

const Fitur = ({ facilities }) => {
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* pop up form */}
      {showPopup && <AddFacility setShowPopup={setShowPopup} auth={auth} />}
      <div className='min-h-[100vh] pt-[85.0667px] pb-6 flex flex-col items-center'>
        {/* header */}
        <header className='flex flex-col items-center gap-2 pt-6'>
          {/* title */}
          <h1 className='text-3xl font-semibold'>Fitur Kos Mohe</h1>
          <p className='text-lg'>
            Berikut merupakan beberapa fitur yang terdapat di Kos Mohe.
          </p>
          {auth?.roles?.includes(5150) && (
            <button
              onClick={() => setShowPopup(true)}
              className='flex items-center px-4 py-1 font-semibold text-white transition-colors duration-150 rounded-md hover:bg-primary-light bg-primary'
            >
              Tambah Fitur
            </button>
          )}
        </header>
        {facilities.length === 0 ? (
          <p className='mt-6'>Loading Data...</p>
        ) : (
          <section id='konten' className='py-6 mt-8'>
            {/* content */}
            <div className='flex flex-col pb-6 gap-y-12'>
              {facilities.map((facility, i) => (
                <div key={i} className='flex items-center rounded-2xl'>
                  <img
                    className='object-cover object-center w-64 border-[1px] border-slate-300 h-36 rounded-tl-2xl rounded-br-2xl'
                    src={`http://localhost:3500/facilities/images/${facility._id}`}
                    alt={`${facility.name}`}
                  />
                  <div className='px-4'>
                    <h3 className='text-xl font-semibold'>{facility.name}</h3>
                    <p>{facility.description}</p>
                    {facility.features[0].split(",").length > 3 ? (
                      <ul className='grid grid-cols-2 grid-rows-4 mt-1 ml-5 text-sm list-disc'>
                        {facility.features[0].split(",").map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    ) : facility.features[0] !== "" ? (
                      <ul className='mt-1 ml-5 text-sm list-disc'>
                        {facility.features[0].split(",").map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Fitur;

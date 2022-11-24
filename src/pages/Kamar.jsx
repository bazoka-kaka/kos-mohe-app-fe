import { CiUser } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddRoom from "../components/AddRoom";
import useAuth from "../hooks/useAuth";

const Kamar = ({ kamar }) => {
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* pop up form */}
      {showPopup && <AddRoom setShowPopup={setShowPopup} auth={auth} />}
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
            {kamar.length === 0 ? (
              <p>Loading Data...</p>
            ) : (
              kamar.map((item, i) => (
                <Link
                  key={i}
                  to='/'
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
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Kamar;

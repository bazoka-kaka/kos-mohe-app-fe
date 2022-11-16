import React from "react";
import { CiUser } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";

const Kamar = ({ kamar }) => {
  return (
    <>
      <div className='min-h-[100vh] pt-[85.0667px] px-48'>
        {/* header */}
        <header className='pt-6'>
          {/* title */}
          <h1 className='text-3xl'>Kamar Kos Mohe</h1>
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

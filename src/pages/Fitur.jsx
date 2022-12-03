import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import AddFacility from "../components/AddFacility";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import UpdateFeature from "../components/UpdateFeature";

const FACILITIES_URL = "/facilities";

const Fitur = ({ facilities, getFacilities, getUserNotifications }) => {
  const { auth } = useAuth();
  const { navigate } = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [facility, setFacility] = useState({});

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(FACILITIES_URL + "/" + id);
      console.log(result?.data);
      getFacilities();
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowUpdate = (facility) => {
    setFacility(facility);
    setShowUpdate(true);
  };

  return (
    <>
      {/* pop up form */}
      {showPopup && (
        <AddFacility
          getFacilities={getFacilities}
          setShowPopup={setShowPopup}
          getUserNotifications={getUserNotifications}
          auth={auth}
        />
      )}
      {showUpdate && (
        <UpdateFeature
          getUserNotifications={getUserNotifications}
          facility={facility}
          setShowUpdate={setShowUpdate}
          auth={auth}
          getFacilities={getFacilities}
        />
      )}
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
                    src={`http://localhost:3500/facilities/images/${
                      facility._id
                    }?${Date.now()}`}
                    alt={`${facility.name}`}
                  />
                  <div className='px-4'>
                    <h3 className='flex items-center gap-2 text-xl font-semibold'>
                      {facility.name}{" "}
                      <button
                        onClick={() => handleShowUpdate(facility)}
                        className='text-black transition duration-200 hover:text-slate-700'
                      >
                        {auth?.roles?.includes(5150) && <AiOutlineEdit />}
                      </button>{" "}
                      <button
                        onClick={() => handleDelete(facility._id)}
                        className='text-red-600 transition duration-200 hover:text-red-500'
                      >
                        {auth?.roles?.includes(5150) && <BsTrashFill />}
                      </button>
                    </h3>
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

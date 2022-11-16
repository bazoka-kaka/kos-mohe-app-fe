import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <>
      <div className='min-h-[100vh] pt-[85.0667px] px-48 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-6'>
          <h1 className='text-4xl'>401 Unauthorized!</h1>
          <div>
            <button
              onClick={goBack}
              className='inline px-12 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;

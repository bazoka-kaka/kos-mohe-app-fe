import React from "react";
import Footer from "../../../components/Footer";
import ProtectedNav from "../../../components/ProtectedNav";
import Sidebar from "../../../components/Sidebar";

const Account = () => {
  return (
    <>
      <ProtectedNav />
      <div className='min-h-[100vh] pt-[85.0667px] px-48 flex'>
        <Sidebar />
      </div>
      <Footer />
    </>
  );
};

export default Account;

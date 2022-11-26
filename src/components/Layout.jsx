import React from "react";
import Nav from "./Nav";
import ProtectedNav from "./ProtectedNav";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = ({ totNotifications }) => {
  const { auth } = useAuth();
  return (
    <>
      {auth?.accessToken ? (
        <ProtectedNav totNotifications={totNotifications} />
      ) : (
        <Nav />
      )}

      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

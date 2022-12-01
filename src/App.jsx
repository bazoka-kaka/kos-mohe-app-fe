import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import PersistLogin from "./components/PersistLogin";

import Fitur from "./pages/Fitur";
import Kamar from "./pages/Kamar";
import KamarDetail from "./pages/KamarDetail";
import Login from "./pages/Auth/Login";
import Account from "./pages/Client/Dashboard/Account";
import Payment from "./pages/Client/Dashboard/Payment";
import Security from "./pages/Client/Dashboard/Security";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Unauthorized from "./pages/401";
import Contact from "./pages/Client/Contact";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import Notifications from "./pages/Notifications";

const KAMAR_URL = "/rooms";
const FACILITIES_URL = "/facilities";
const NOTIFICATIONS_URL = "/notifications";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

const App = () => {
  const [kamar, setKamar] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [src, setSrc] = useState("");

  const getKamar = async () => {
    try {
      const response = await axios.get(KAMAR_URL);
      console.log(response?.data);
      setKamar(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFacilities = async () => {
    try {
      const response = await axios.get(FACILITIES_URL);
      console.log(response?.data);
      setFacilities(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserNotifications = async (user_id) => {
    try {
      const response = await axios.get(NOTIFICATIONS_URL + "/" + user_id);
      console.log(response?.data);
      setNotifications(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getKamar();
    getFacilities();
  }, []);

  return (
    <Routes>
      <Route
        element={<Layout src={src} totNotifications={notifications.length} />}
        path='/'
      >
        {/* public */}
        <Route
          path='/'
          element={<Home kamar={kamar} facilities={facilities} />}
        />
        <Route path='register' element={<Register />} />
        <Route
          path='login'
          element={
            <Login
              setSrc={setSrc}
              getUserNotifications={getUserNotifications}
            />
          }
        />

        {/* protected */}
        <Route element={<PersistLogin />}>
          {/* general */}
          <Route
            path='kamar'
            element={
              <Kamar
                getUserNotifications={getUserNotifications}
                kamar={kamar}
                getKamar={getKamar}
              />
            }
          />
          {kamar.map((item) => (
            <Route
              path={`kamar/${item.name}`}
              element={
                <KamarDetail
                  getUserNotifications={getUserNotifications}
                  room={item}
                  getKamar={getKamar}
                />
              }
            />
          ))}

          <Route
            path='fitur'
            element={
              <Fitur
                getUserNotifications={getUserNotifications}
                getFacilities={getFacilities}
                facilities={facilities}
              />
            }
          />

          {/* user */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route
              path='dashboard'
              element={<Account src={src} setSrc={setSrc} />}
            />
            <Route
              path='payment'
              element={<Payment getUserNotifications={getUserNotifications} />}
            />
            <Route path='security' element={<Security />} />
            <Route path='contact' element={<Contact />} />
            <Route
              path='notifications'
              element={
                <Notifications
                  notifications={notifications}
                  setNotifications={setNotifications}
                />
              }
            />
          </Route>
          {/* admin */}
        </Route>

        {/* errors */}
        <Route path='*' element={<NotFound />} />
        <Route path='unauthorized' element={<Unauthorized />} />
      </Route>
    </Routes>
  );
};

export default App;

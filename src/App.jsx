import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
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

const KAMAR_URL = "/rooms";
const FACILITIES_URL = "/facilities";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

const App = () => {
  const { auth } = useAuth();

  const [kamar, setKamar] = useState([]);
  const [facilities, setFacilities] = useState([]);

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

  useEffect(() => {
    getKamar();
    getFacilities();
  }, []);

  // eslint-disable-next-line
  const [details, setDetails] = useState({
    doubleDeluxe: {
      title: "Kamar Double Deluxe",
      img: "/imgs/kamar/double.png",
      detail: [
        "Rp 1.200.000/bulan",
        "Maksimal 2 orang per kamar",
        "Kamar mandi dalam",
        "Tidak untuk pasutri",
        "Tidak boleh bawa anak",
        "AC",
      ],
      price: 1200000,
      people: 2,
    },
    doubleReguler: {
      title: "Kamar Double Reguler",
      img: "/imgs/kamar/double.png",
      detail: [
        "Rp 1.000.000/bulan",
        "Maksimal 2 orang per kamar",
        "Kamar mandi luar",
        "Tidak untuk pasutri",
        "Tidak boleh bawa anak",
        "Non-AC",
      ],
      price: 1000000,
      people: 2,
    },
    deluxe: {
      title: "Kamar Deluxe",
      img: "/imgs/kamar/deluxe.png",
      detail: [
        "Rp 900.000/bulan",
        "Maksimal 1 orang per kamar",
        "Kamar mandi dalam",
        "Tidak untuk pasutri",
        "Tidak boleh bawa anak",
        "AC",
      ],
      price: 900000,
      people: 1,
    },
    reguler: {
      title: "Kamar Reguler",
      img: "/imgs/kamar/reguler.png",
      detail: [
        "Rp 700.000/bulan",
        "Maksimal 1 orang per kamar",
        "Kamar mandi luar",
        "Tidak untuk pasutri",
        "Tidak boleh bawa anak",
        "Non-AC",
      ],
      price: 700000,
      people: 1,
    },
  });
  return (
    <Routes>
      <Route element={<Layout />} path='/'>
        {/* public */}
        <Route
          path='/'
          element={<Home kamar={kamar} facilities={facilities} />}
        />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />

        {/* protected */}
        <Route element={<PersistLogin />}>
          {/* general */}
          <Route path='kamar' element={<Kamar kamar={kamar} />} />
          <Route
            path='kamar/double-deluxe'
            element={
              <KamarDetail
                title={details.doubleDeluxe.title}
                detail={details.doubleDeluxe.detail}
                price={details.doubleDeluxe.price}
                people={details.doubleDeluxe.people}
                img={details.doubleDeluxe.img}
              />
            }
          />
          <Route
            path='kamar/double-reguler'
            element={
              <KamarDetail
                title={details.doubleReguler.title}
                detail={details.doubleReguler.detail}
                price={details.doubleReguler.price}
                people={details.doubleReguler.people}
                img={details.doubleReguler.img}
              />
            }
          />
          <Route
            path='kamar/deluxe'
            element={
              <KamarDetail
                title={details.deluxe.title}
                detail={details.deluxe.detail}
                price={details.deluxe.price}
                people={details.deluxe.people}
                img={details.deluxe.img}
              />
            }
          />
          <Route
            path='kamar/reguler'
            element={
              <KamarDetail
                title={details.reguler.title}
                detail={details.reguler.detail}
                price={details.reguler.price}
                people={details.reguler.people}
                img={details.reguler.img}
              />
            }
          />
          <Route path='fitur' element={<Fitur facilities={facilities} />} />

          {/* user */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path='dashboard' element={<Account />} />
            <Route path='payment' element={<Payment />} />
            <Route path='security' element={<Security />} />
            <Route path='contact' element={<Contact />} />
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

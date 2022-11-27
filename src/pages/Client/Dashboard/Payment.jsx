import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import AddProve from "../../../components/AddProve";
import VerifyProve from "../../../components/VerifyProve";

const ORDERS_URL = "/orders";

const Payment = ({ getUserNotifications }) => {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const [orders, setOrders] = useState([]);
  const [tot, setTot] = useState({
    paid: 0,
    unpaid: 0,
    verified: 0,
    unverified: 0,
  });
  const [currOrder, setCurrOrder] = useState({});
  const [maxi, setMaxi] = useState(4);
  const [showPopup, setShowPopup] = useState(false);
  const [showPaid, setShowPaid] = useState(false);
  const [showVerified, setShowVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdd = () => {
    if (maxi < orders.length) {
      setMaxi((prev) => prev + 4);
    }
  };

  const handleShowPopup = (order) => {
    setShowPopup(true);
    setCurrOrder(order);
  };

  const handleTot = (items) => {
    items.forEach((item) => {
      if (item.paid) {
        setTot((prev) => ({ ...prev, paid: prev.paid + 1 }));
      }
      if (!item.paid) {
        setTot((prev) => ({ ...prev, unpaid: prev.unpaid + 1 }));
      }
      if (item.verified) {
        setTot((prev) => ({ ...prev, verified: prev.verified + 1 }));
      }
      if (!item.verified) {
        setTot((prev) => ({ ...prev, unverified: prev.unverified + 1 }));
      }
    });
  };

  const getOrders = async () => {
    try {
      auth.roles.includes(5150)
        ? await axios.get(ORDERS_URL).then((response) => {
            setOrders(response?.data);
            handleTot(response?.data);
          })
        : await axios.get(ORDERS_URL + "/" + auth.id).then((response) => {
            setOrders(response?.data);
            handleTot(response?.data);
          });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsAdmin(auth.roles.includes(5150));
    getOrders();
  }, []);

  return (
    <>
      {/* pop up form */}
      {showPopup ? (
        isAdmin ? (
          <VerifyProve
            setShowPopup={setShowPopup}
            auth={auth}
            order={currOrder}
            getOrders={getOrders}
            getUserNotifications={getUserNotifications}
          />
        ) : (
          <AddProve
            setShowPopup={setShowPopup}
            auth={auth}
            order={currOrder}
            getOrders={getOrders}
            getUserNotifications={getUserNotifications}
          />
        )
      ) : null}
      <div className='min-h-[100vh] pt-[85.0667px] pb-8 flex px-48'>
        <Sidebar />
        <section className='w-2/3 pl-6'>
          {/* title */}
          <div className='flex items-center justify-between'>
            <h1 className='text-xl'>
              {auth.roles.includes(5150) && "Verifikasi "}Pembayaran
            </h1>
            {(auth.roles.includes(5150) ? showVerified : showPaid) ? (
              <button
                className='text-blue-600 transition duration-200 hover:text-red-600'
                onClick={() => {
                  setMaxi(4);
                  auth.roles.includes(5150)
                    ? setShowVerified(false)
                    : setShowPaid(false);
                }}
              >
                Tampilkan Belum
                {auth.roles.includes(5150) ? "  Terverifikasi" : " Lunas"}
              </button>
            ) : (
              <button
                className='text-blue-600 transition duration-200 hover:text-red-600'
                onClick={() => {
                  setMaxi(4);
                  auth.roles.includes(5150)
                    ? setShowVerified(true)
                    : setShowPaid(true);
                }}
              >
                Tampilkan
                {auth.roles.includes(5150) ? "  Terverifikasi" : " Lunas"}
              </button>
            )}
          </div>
          {/* content */}
          <div className='p-4 mt-4 border-[1.5px] rounded-lg border-slate-200'>
            <h2 className='font-semibold text-slate-700'>
              Pembayaran{" "}
              {auth.roles.includes(5150)
                ? showVerified
                  ? "Terverifikasi"
                  : "Belum Terverifikasi"
                : showPaid
                ? "Lunas"
                : "Belum Lunas"}
            </h2>
            <div className='mt-4'>
              {/* cards */}
              {(
                auth.roles.includes(5150)
                  ? (showVerified && tot.verified === 0) ||
                    (!showVerified && tot.unverified === 0)
                  : (showPaid && tot.paid === 0) ||
                    (!showPaid && tot.unpaid === 0)
              ) ? (
                <p>No Data Found</p>
              ) : (
                orders.map((order, i) => {
                  if (!auth.roles.includes(5150)) {
                    if (showPaid) {
                      return (
                        order.paid && (
                          <Card
                            handleShowPopup={handleShowPopup}
                            order={order}
                          />
                        )
                      );
                    } else {
                      return (
                        !order.paid && (
                          <Card
                            handleShowPopup={handleShowPopup}
                            order={order}
                          />
                        )
                      );
                    }
                  } else {
                    if (showVerified) {
                      return (
                        order.verified && (
                          <Card
                            handleShowPopup={handleShowPopup}
                            order={order}
                          />
                        )
                      );
                    } else {
                      return (
                        !order.verified && (
                          <Card
                            handleShowPopup={handleShowPopup}
                            order={order}
                          />
                        )
                      );
                    }
                  }
                })
              )}
              {/* {((showPaid && maxi < tot.paid) ||
                (!showPaid && maxi < tot.unpaid)) && (
                <button
                  onClick={handleAdd}
                  className='px-2 py-1 mt-4 text-white transition duration-200 bg-black rounded-md hover:bg-slate-700'
                >
                  Show More
                </button>
              )} */}
            </div>
            {/* cta */}
            <div className='flex justify-between mt-8'>
              {/* first part */}
              <div>
                <button
                  onClick={signOut}
                  className='p-2 text-sm font-semibold text-red-400 border-2 border-red-400 rounded-md'
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const Card = ({ order, handleShowPopup }) => {
  return (
    <div className='flex flex-col mt-2'>
      <div className='flex px-12 py-2 rounded-xl justify-between border-[1px] border-slate-200'>
        <div className='flex flex-col gap-2'>
          <h3 className='font-semibold text-slate-700'>{order.name}</h3>
          <p className='text-sm text-slate-500'>{order.duration} Bulan</p>
          <p className='text-sm text-slate-500'>
            {order.begin_date.substring(0, 10)} s.d{" "}
            {order.end_date.substring(0, 10)}
          </p>
        </div>
        <div className='flex flex-col items-end justify-center'>
          <button
            onClick={() => handleShowPopup(order)}
            className='px-4 py-1 text-white transition duration-200 rounded-md bg-primary hover:bg-primary-light'
          >
            Detail
          </button>
          <p className='mt-2 text-sm'>Total: Rp {order.total_price}</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;

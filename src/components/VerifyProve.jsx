import React, { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const ORDER_URL = "/orders";
const NOTIFICATIONS_URL = "/notifications";

const VerifyProve = ({
  setShowPopup,
  auth,
  order,
  getOrders,
  getUserNotifications,
}) => {
  const errRef = useRef();

  const handleCancel = () => {
    setShowPopup(false);
  };

  // image data
  const [src, setSrc] = useState("");

  // errors and success
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // form data
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paid, setPaid] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setName(order.name);
    setDuration(order.duration);
    setTotalPrice(order.total_price);
    setBeginDate(order.begin_date);
    setEndDate(order.end_date);
    setPaid(order.paid);
    setVerified(order.verified);
    setSrc(`http://localhost:3500/orders/images/${order._id}`);
  }, []);

  const handleNotification = async (e) => {
    try {
      let result = await axios.post(
        NOTIFICATIONS_URL,
        JSON.stringify({
          user_id: auth.id,
          title: "Verifikasi Sukses",
          description: `Anda telah melakukan verifikasi terhadap pesanan kamar
             ${name} dengan pesanan atas nama ${order.user_name}.`,
          link: "/payment",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(result?.data);
      result = await axios.post(
        NOTIFICATIONS_URL,
        JSON.stringify({
          user_id: order.user_id,
          title: "Verifikasi Sukses",
          description: `Bukti bayar kamar ${order.name} telah diverifikasi. Terimakasih telah memilih layanan kos kami.`,
          link: "/payment",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(result?.data);
      getUserNotifications(auth.id);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.message);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Order creation Failed");
        console.log(err);
      }
      errRef.current.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.put(
        ORDER_URL + "/admin",
        JSON.stringify({
          roles: auth.roles,
          id: order._id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      if (response?.data) {
        handleNotification();
      }
      getOrders();
      setSuccess(true);
      setShowPopup(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.message);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Upload Bukti Bayar Failed");
        console.log(err);
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {/* transparent layer */}
      <div className='fixed top-0 z-10 left-0 w-full min-h-[calc(100vh+85.0667px)] bg-black opacity-30'></div>
      {/* create new room form */}
      <div className='fixed overflow-y-scroll z-20 w-full flex items-center justify-center min-h-[calc(100vh+85.0667px)]'>
        <div className='w-1/2 px-8 py-6 bg-white border-2 rounded-md border-slate-700'>
          {/* error message */}
          <p
            ref={errRef}
            className={`bg-red-400 text-white p-2 rounded-md ${
              errMsg ? "inline-block mb-4" : "hidden"
            }`}
            aria-live='assertive'
          >
            <FontAwesomeIcon icon={faCircleXmark} className='text-white-400 ' />{" "}
            {errMsg}
          </p>
          <div className='flex justify-between'>
            <h1 className='text-3xl font-semibold'>Verifikasi Bukti Bayar</h1>
            <div className='flex gap-2'>
              {paid ? (
                <div className='flex items-center px-2 py-1 text-sm bg-green-200 border-2 rounded-lg border-slate-700'>
                  <p>Paid</p>
                </div>
              ) : (
                <div className='flex items-center px-2 text-sm bg-red-200 border-2 rounded-lg border-slate-700'>
                  <p>Not Paid</p>
                </div>
              )}
              {verified ? (
                <div className='flex items-center px-2 py-1 text-sm bg-green-200 border-2 rounded-lg border-slate-700'>
                  <p>Verified</p>
                </div>
              ) : (
                <div className='flex items-center px-2 text-sm bg-red-200 border-2 rounded-lg border-slate-700'>
                  <p>Not Verified</p>
                </div>
              )}
            </div>
          </div>
          <div className='mt-2'>
            <p>
              Nama Kamar: <span className='font-semibold'>{name}</span>
            </p>
            <p>
              Durasi Pemesanan:{" "}
              <span className='font-semibold'>{duration} bulan</span>
            </p>
            <p>
              Tanggal Pemesanan:{" "}
              <span className='font-semibold'>
                {beginDate.substring(0, 10)} s.d {endDate.substring(0, 10)}
              </span>
            </p>
            <p>
              Harga Total:{" "}
              <span className='font-semibold'>Rp. {totalPrice}</span>
            </p>
          </div>
          {order.paid ? (
            <div className='flex flex-col gap-4'>
              <a
                href={src}
                target='_blank'
                className='inline-block mt-4 font-semibold text-blue-600 transition duration-200 hover:text-red-400'
              >
                Lihat bukti bayar
              </a>
              {!verified && (
                <button
                  onClick={handleVerify}
                  type='button'
                  className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-black rounded-md hover:bg-slate-700'
                >
                  Verifikasi
                </button>
              )}

              <button
                onClick={handleCancel}
                type='button'
                className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-red-500 rounded-md hover:bg-red-400'
              >
                Close
              </button>
            </div>
          ) : (
            <button
              onClick={handleCancel}
              type='button'
              className='inline-block w-full py-2 mt-4 text-sm font-semibold text-white transition-colors duration-150 bg-red-500 rounded-md hover:bg-red-400'
            >
              Close
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyProve;

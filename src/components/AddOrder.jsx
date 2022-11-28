import React, { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const ORDER_URL = "/orders";
const NOTIFICATIONS_URL = "/notifications";

const AddOrder = ({ setShowPopup, auth, room, getUserNotifications }) => {
  const errRef = useRef();

  const handleCancel = () => {
    setShowPopup(false);
  };

  // errors and success
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // form data
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setName(room.name);
    setUserId(auth.id);
    setRoomId(room._id);
  }, []);

  useEffect(() => {
    const diffTime = endDate.getTime() - beginDate.getTime();
    const diffMonth = Math.round(diffTime / (1000 * 3600 * 24 * 30));
    setDuration(diffMonth);
  }, [beginDate, endDate]);

  useEffect(() => {
    setTotalPrice(duration * room.price);
  }, [duration]);

  const handleNotification = async (e) => {
    try {
      const result = await axios.post(
        NOTIFICATIONS_URL,
        JSON.stringify({
          user_id: auth.id,
          title: "Pesanan Baru Telah Dibuat",
          description: `Anda melakukan penyewaan kamar ${name} selama ${duration} bulan. Lakukan pembayaran sebelum ${beginDate}`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = name !== "";
    const v2 = userId !== "";
    const v3 = roomId !== "";
    const v4 = duration > 0;
    const v5 = totalPrice !== 0;
    const v6 = beginDate !== new Date();
    const v7 = endDate !== new Date();
    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        ORDER_URL,
        JSON.stringify({
          name,
          user_id: userId,
          user_name: auth.fullname,
          room_id: roomId,
          duration,
          total_price: totalPrice,
          begin_date: beginDate,
          end_date: endDate,
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
      console.log(response?.accessToken);
      handleCancel();

      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName("");
      setUserId("");
      setRoomId("");
      setDuration(0);
      setTotalPrice(0);
      setBeginDate(new Date());
      setEndDate(new Date());
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
  return (
    <>
      {/* transparent layer */}
      <div className='fixed top-0 z-10 left-0 w-full min-h-[calc(100vh+85.0667px)] bg-black opacity-30'></div>
      {/* create new room form */}
      <div className='fixed z-20 w-full flex items-center justify-center min-h-[calc(100vh+85.0667px)]'>
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
          <h1 className='text-3xl font-semibold'>Tambahkan Pesanan</h1>
          <div className='mt-2'>
            <p>
              Nama Kamar: <span className='font-semibold'>{name}</span>
            </p>
            <p>
              Durasi Pemesanan:{" "}
              <span className='font-semibold'>{duration} bulan</span>
            </p>
            <p>
              Harga Total:{" "}
              <span className='font-semibold'>Rp. {totalPrice}</span>
            </p>
          </div>
          <form
            className='flex flex-col gap-2 mt-4 select-none'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='beginDate'>Tanggal Mulai Sewa</label>
              <input
                className='p-1 border-2 rounded-md border-slate-700'
                id='beginDate'
                type='date'
                autoComplete='off'
                onChange={(e) => setBeginDate(e.target.valueAsDate)}
                required
              />
            </div>
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='endDate'>Tanggal Akhir Sewa</label>
              <input
                className='p-1 border-2 rounded-md border-slate-700'
                id='endDate'
                type='date'
                autoComplete='off'
                onChange={(e) => setEndDate(e.target.valueAsDate)}
                required
              />
            </div>
            <div className='flex gap-4 mt-2'>
              <button
                type='submit'
                className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-black hover:bg-slate-700 rounded-2xl'
              >
                Pesan
              </button>
              <button
                onClick={handleCancel}
                type='button'
                className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-red-500 hover:bg-red-400 rounded-2xl'
              >
                Batalkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddOrder;

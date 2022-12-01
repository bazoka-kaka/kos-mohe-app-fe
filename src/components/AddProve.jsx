import React, { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import toast from "react-hot-toast";

const ORDER_URL = "/orders";
const NOTIFICATIONS_URL = "/notifications";

const AddProve = ({
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
  const [image, setImage] = useState("");

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
          title: "Pembayaran Sukses",
          description: `Anda telah melakukan pembayaran terhadap pesanan kamar
             ${name} selama ${duration} bulan. Tunggu verifikasi dari
             pemilik.`,
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
          user_id: "6381dde3315a8cd51e08ad4a",
          title: "Verifikasi Pembayaran",
          description: `Pengguna atas nama ${auth.fullname} telah melakukan pembayaran.`,
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
    const v1 = image !== "";
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("roles", auth.roles);
      formData.append("id", order._id);
      formData.append("image", image);
      formData.append("paid", true);
      const response = await axios.put(ORDER_URL, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      console.log(response?.data);
      if (response?.data) {
        handleNotification();
      }
      getOrders();
      setSuccess(true);
      toast.success("Bukti Pembayaran Berhasil Dikirim!");
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
            <h1 className='text-3xl font-semibold'>Upload Bukti Bayar</h1>
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
              <button
                onClick={handleCancel}
                type='button'
                className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-red-500 rounded-md hover:bg-red-400'
              >
                Close
              </button>
            </div>
          ) : (
            <form
              className='flex flex-col gap-2 mt-4 select-none'
              onSubmit={handleSubmit}
            >
              <div className='flex flex-col gap-[1.5px]'>
                <label htmlFor='image'>Upload Bukti Bayar</label>
                <input
                  id='image'
                  name='image'
                  type='file'
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>
              <div className='flex gap-4 mt-2'>
                <button
                  type='submit'
                  className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-black hover:bg-slate-700 rounded-2xl'
                >
                  Upload
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
          )}
        </div>
      </div>
    </>
  );
};

export default AddProve;

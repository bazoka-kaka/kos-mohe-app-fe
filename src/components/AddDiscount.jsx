import React, { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import handleUsersNotification from "./HandleUsersNotification";
import toast from "react-hot-toast";

const NAME_REGEX = /^[a-zA-Z ]{3,23}$/;
const DISCOUNTS_URL = "/discounts";

const AddDiscounts = ({
  setShowPopup,
  auth,
  getDiscounts,
  getUserNotifications,
  rooms,
}) => {
  const errRef = useRef();

  const handleCancel = () => {
    setShowPopup(false);
  };

  // errors and success
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // form data
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [kamarId, setKamarId] = useState("");
  const [validKamarId, setValidKamarId] = useState(false);

  const [kamarName, setKamarName] = useState("");
  const [validKamarName, setValidKamarName] = useState(false);

  const [cut, setCut] = useState(0);
  const [validCut, setValidCut] = useState(false);

  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);

  const [beginDate, setBeginDate] = useState("");
  const [validBeginDate, setValidBeginDate] = useState(false);

  const [endDate, setEndDate] = useState("");
  const [validEndDate, setValidEndDate] = useState(false);

  // select logics
  useEffect(() => {
    rooms.map((room) => {
      if (room.name === kamarName) {
        setKamarId(room._id);
      }
    });
  }, [kamarName]);

  // validation logics
  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidKamarId(kamarId.length > 0);
  }, [kamarId]);

  useEffect(() => {
    setValidKamarName(kamarName.length > 3);
  }, [kamarName]);

  useEffect(() => {
    setValidCut(cut > 0);
  }, [cut]);

  useEffect(() => {
    setValidBeginDate(beginDate !== "");
  }, [beginDate]);

  useEffect(() => {
    setValidEndDate(endDate !== "");
  }, [endDate]);

  useEffect(() => {
    setValidDescription(description.length > 3);
  }, [description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(name);
    const v2 = kamarId.length > 0;
    const v3 = kamarName.length > 3;
    const v4 = cut > 0;
    const v5 = beginDate !== "";
    const v6 = endDate !== "";
    const v7 = description.length > 3;
    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        DISCOUNTS_URL,
        JSON.stringify({
          name: name,
          kamar_id: kamarId,
          kamar_name: kamarName,
          cut: cut,
          description: description,
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
      setSuccess(true);
      getDiscounts();
      handleUsersNotification(
        auth,
        getUserNotifications,
        errRef,
        setErrMsg,
        `Diskon pada kamar ${kamarName}!`,
        `Diskon ${cut}% terhadap kamar ${kamarName} telah tersedia!`,
        "/"
      );
      toast.success("Discount Baru Berhasil Dibuat!");
      handleCancel();
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName("");
      setKamarId("");
      setKamarName("");
      setCut(0);
      setDescription("");
      setBeginDate("");
      setEndDate("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(
          "Name, KamarId, kamarName, cut, description, beginDate, and endDate are required"
        );
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Discount creation Failed");
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
          <h1 className='text-3xl font-semibold'>Tambahkan Diskon</h1>
          <form
            className='flex flex-col gap-2 mt-4 select-none'
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='name'>
                Nama Diskon{" "}
                {validName || !name ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${!name ? "hidden" : "inline"}`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className='text-red-400 '
                  />
                )}
              </label>
              <input
                className='p-1 border-2 rounded-md border-slate-700'
                placeholder='Min. 3 karakter'
                id='name'
                type='text'
                autoComplete='off'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
              />
            </div>
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='kamarName'>
                Nama Kamar{" "}
                {validKamarName || !kamarName ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !kamarName ? "hidden" : "inline"
                    }`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className='text-red-400 '
                  />
                )}
              </label>
              <select
                className='px-1 py-2 bg-white border-2 rounded-md border-slate-700'
                id='kamarName'
                onChange={(e) => setKamarName(e.target.value)}
                // value={kamarName}
              >
                {rooms.map((room, i) => (
                  <option value={room.name} key={i}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='cut'>
                Potongan Harga (Persen){" "}
                {validCut || !cut ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${!cut ? "hidden" : "inline"}`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className='text-red-400 '
                  />
                )}
              </label>
              <input
                className='p-1 border-2 rounded-md border-slate-700'
                id='cut'
                type='number'
                autoComplete='off'
                onChange={(e) => setCut(e.target.valueAsNumber)}
                value={cut}
                required
                aria-invalid={validCut ? "false" : "true"}
                aria-describedby='uidnote'
              />
            </div>
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='description'>
                Deskripsi Diskon{" "}
                {validDescription || !description ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !description ? "hidden" : "inline"
                    }`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className='text-red-400 '
                  />
                )}
              </label>
              <textarea
                className='p-1 border-2 rounded-md border-slate-700'
                id='description'
                autoComplete='off'
                placeholder='Min. 3 karakter'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                aria-invalid={validDescription ? "false" : "true"}
                aria-describedby='uidnote'
              />
            </div>
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='beginDate'>
                Tanggal Mulai{" "}
                {validBeginDate || !beginDate ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !beginDate ? "hidden" : "inline"
                    }`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className='text-red-400 '
                  />
                )}
              </label>
              <input
                className='p-1 border-2 rounded-md border-slate-700'
                id='beginDate'
                type='date'
                autoComplete='off'
                onChange={(e) => setBeginDate(e.target.valueAsDate)}
                required
                aria-invalid={validBeginDate ? "false" : "true"}
                aria-describedby='uidnote'
              />
            </div>
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='endDate'>
                Tanggal Berakhir{" "}
                {validEndDate || !endDate ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !endDate ? "hidden" : "inline"
                    }`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className='text-red-400 '
                  />
                )}
              </label>
              <input
                className='p-1 border-2 rounded-md border-slate-700'
                id='endDate'
                type='date'
                autoComplete='off'
                onChange={(e) => setEndDate(e.target.valueAsDate)}
                required
                aria-invalid={validEndDate ? "false" : "true"}
                aria-describedby='uidnote'
              />
            </div>
            <div className='flex gap-4 mt-2'>
              <button
                type='submit'
                className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-black hover:bg-slate-700 rounded-2xl'
              >
                Simpan
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

export default AddDiscounts;

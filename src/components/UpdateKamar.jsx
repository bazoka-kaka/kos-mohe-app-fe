import React, { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import handleUsersNotification from "./HandleUsersNotification";

const NAME_REGEX = /^[a-zA-Z ]{3,23}$/;
const KAMAR_URL = "/rooms";

const UpdateKamar = ({
  setShowPopup,
  getKamar,
  auth,
  room,
  setSrc,
  getUserNotifications,
}) => {
  const errRef = useRef();

  const handleCancel = () => {
    setShowPopup(false);
  };

  // errors and success
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // logic handling
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  // form data
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [image, setImage] = useState("");

  const [price, setPrice] = useState(0);
  const [validPrice, setValidPrice] = useState(false);

  const [quantity, setQuantity] = useState(0);
  const [validQuantity, setValidQuantity] = useState(false);

  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);

  const [ac, setAc] = useState(false);
  const [kmandi, setKmandi] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPrice(price > 0);
  }, [price]);

  useEffect(() => {
    setValidQuantity(quantity > 0);
  }, [quantity]);

  useEffect(() => {
    setValidDescription(description.length > 3);
  }, [description]);

  useEffect(() => {
    setName(room.name);
    setPrice(room.price);
    setQuantity(room.quantity);
    setDescription(room.description);
    setAc(room.features.ac);
    setKmandi(room.features.kmandi);
    setCapacity(room.features.capacity);
    setFeatured(room.features.featured);
  }, []);

  const reloadImage = () => {
    setSrc(`http://localhost:3500/rooms/images/${room._id}?${Date.now()}`);
  };

  const handleForget = () => {
    setName(room.name);
    setPrice(room.price);
    setQuantity(room.quantity);
    setDescription(room.description);
    setAc(room.features.ac);
    setKmandi(room.features.kmandi);
    setCapacity(room.features.capacity);
    setFeatured(room.features.featured);
    setImage("");
    setEditing(false);
  };

  const handleImageSubmit = async () => {
    const formData = new FormData();
    formData.append("roles", auth.roles);
    formData.append("image", image);

    try {
      const response = await axios.put(
        KAMAR_URL + "/images/" + room._id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      reloadImage();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Profile Update Failed");
        console.log(err);
      }
      errRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(name);
    const v2 = price > 0;
    const v3 = quantity > 0;
    const v4 = description.length > 3;
    if (image !== "") {
      handleImageSubmit();
    }
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.put(
        KAMAR_URL,
        JSON.stringify({
          roles: auth.roles,
          id: room._id,
          name: name,
          price: price,
          quantity: quantity,
          description: description,
          ac: ac,
          kmandi: kmandi,
          capacity: capacity,
          featured: featured,
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
      console.log(response?.accessToken);
      toast.success("Kamar Berhasil Diupdate!");
      setSuccess(true);
      getKamar();
      setTimeout(() => {
        navigate(`/kamar/${name}`);
      }, 2000);
      handleUsersNotification(
        auth,
        getUserNotifications,
        errRef,
        setErrMsg,
        `Kamar Berhasil Diupdate`,
        `Kamar dengan nama ${name} telah diupdate.`,
        "/kamar"
      );
      handleCancel();
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName("");
      setImage("");
      setPrice(0);
      setQuantity(0);
      setDescription("");
      setAc(false);
      setKmandi("");
      setCapacity(1);
      setFeatured(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.message);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Kamar Update Failed");
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
          <h1 className='text-3xl font-semibold'>Edit Kamar</h1>
          <form
            className='flex flex-col gap-2 mt-4 select-none'
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
            <div className='flex flex-col gap-1'>
              <label htmlFor='name'>
                Nama Kamar{" "}
                {validName || !name ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !name || !editing ? "hidden" : "inline"
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
                className={`border-[1px] border-slate-400 ${
                  !editing && "cursor-not-allowed bg-slate-200"
                } p-2 rounded-md`}
                type='text'
                id='name'
                placeholder='Min. 3 karakter'
                autoComplete='off'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                aria-invalid={validName ? "false" : "true"}
                disabled={!editing}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='price'>
                Harga Kamar{" "}
                {validPrice || !price ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !price || !editing ? "hidden" : "inline"
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
                className={`border-[1px] border-slate-400 ${
                  !editing && "cursor-not-allowed bg-slate-200"
                } p-2 rounded-md`}
                type='number'
                id='price'
                autoComplete='off'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                aria-invalid={validPrice ? "false" : "true"}
                disabled={!editing}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='quantity'>
                Jumlah Kamar{" "}
                {validQuantity || !quantity ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !quantity || !editing ? "hidden" : "inline"
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
                className={`border-[1px] border-slate-400 ${
                  !editing && "cursor-not-allowed bg-slate-200"
                } p-2 rounded-md`}
                type='number'
                id='quantity'
                autoComplete='off'
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                required
                aria-invalid={validQuantity ? "false" : "true"}
                disabled={!editing}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='description'>
                Deskripsi Kamar{" "}
                {validDescription || !description ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !description || !editing ? "hidden" : "inline"
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
                className={`border-[1px] border-slate-400 ${
                  !editing && "cursor-not-allowed bg-slate-200"
                } p-2 rounded-md`}
                type='text'
                id='description'
                autoComplete='off'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                aria-invalid={validDescription ? "false" : "true"}
                disabled={!editing}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='image'>Gambar Kamar</label>
              <input
                type='file'
                id='image'
                name='image'
                onChange={(e) => setImage(e.target.files[0])}
                className={!editing && "cursor-not-allowed"}
                disabled={!editing}
              />
              <a
                href={`http://localhost:3500/rooms/images/${room._id}`}
                target='_blank'
                className='text-blue-700 transition duration-200 hover:text-red-600'
              >
                Lihat Gambar Sebelum Update
              </a>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='font-semibold'>Fitur Kamar</p>
              <div className='grid grid-cols-2 grid-row-3'>
                <div className='flex gap-4'>
                  <p>Ber-AC?</p>
                  <div className='flex gap-2'>
                    <div>
                      <input
                        type='radio'
                        id='ac-ya'
                        name='ac'
                        value='ya'
                        onChange={() => setAc(true)}
                        checked={ac}
                        className={!editing && "cursor-not-allowed"}
                        disabled={!editing}
                      />{" "}
                      <label htmlFor='ac-ya'>Ya</label>
                    </div>
                    <div>
                      <input
                        type='radio'
                        id='ac-tidak'
                        name='ac'
                        value='tidak'
                        onChange={() => setAc(false)}
                        checked={!ac}
                        className={!editing && "cursor-not-allowed"}
                        disabled={!editing}
                      />{" "}
                      <label htmlFor='ac-tidak'>Tidak</label>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <p>Kamar Mandi</p>
                  <div className='flex gap-2'>
                    <div>
                      <input
                        type='radio'
                        id='dalam'
                        name='kamar-mandi'
                        value='dalam'
                        onChange={(e) => setKmandi(e.target.value)}
                        checked={kmandi === "dalam"}
                        className={!editing && "cursor-not-allowed"}
                        disabled={!editing}
                      />{" "}
                      <label htmlFor='dalam'>Dalam</label>
                    </div>
                    <div>
                      <input
                        type='radio'
                        id='luar'
                        name='kamar-mandi'
                        value='luar'
                        onChange={(e) => setKmandi(e.target.value)}
                        checked={kmandi === "luar" || kmandi === ""}
                        className={!editing && "cursor-not-allowed"}
                        disabled={!editing}
                      />{" "}
                      <label htmlFor='luar'>Luar</label>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <p>Kapasitas Kamar</p>
                  <div className='flex gap-2'>
                    <div>
                      <input
                        type='radio'
                        id='satu'
                        name='kapasitas-kamar'
                        value='satu'
                        onChange={() => setCapacity(1)}
                        checked={capacity === 1}
                        className={!editing && "cursor-not-allowed"}
                        disabled={!editing}
                      />{" "}
                      <label htmlFor='satu'>1 orang</label>
                    </div>
                    <div>
                      <input
                        type='radio'
                        id='dua'
                        name='kapasitas-kamar'
                        value='dua'
                        onChange={() => setCapacity(2)}
                        checked={capacity === 2}
                        className={!editing && "cursor-not-allowed"}
                        disabled={!editing}
                      />{" "}
                      <label htmlFor='dua'>2 orang</label>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <p>Featured?</p>
                  <div className='flex gap-2'>
                    <div>
                      <input
                        type='radio'
                        id='featured-ya'
                        name='featured'
                        value='ya'
                        onChange={() => setFeatured(true)}
                        checked={featured}
                        className={!editing && "cursor-not-allowed"}
                        disabled={!editing}
                      />{" "}
                      <label htmlFor='featured-ya'>Ya</label>
                    </div>
                    <div>
                      <input
                        type='radio'
                        id='featured-no'
                        name='featured'
                        value='tidak'
                        onChange={() => setFeatured(false)}
                        checked={!featured}
                        className={!editing && "cursor-not-allowed"}
                        disabled={!editing}
                      />{" "}
                      <label htmlFor='featured-no'>Tidak</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-4 mt-2'>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  type='button'
                  className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-black hover:bg-slate-700 rounded-2xl'
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  type='button'
                  className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 rounded-2xl hover:bg-primary-light bg-primary'
                >
                  Simpan
                </button>
              )}
              <button
                onClick={editing ? handleForget : handleCancel}
                type='button'
                className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-red-500 hover:bg-red-400 rounded-2xl'
              >
                {editing ? "Lupakan" : "Batalkan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateKamar;

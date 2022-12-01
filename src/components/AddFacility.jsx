import React, { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const NOTIFICATIONS_URL = "/notifications";
const FACILITY_URL = "/facilities";
const USERS_URL = "/users";

const AddFacility = ({
  getFacilities,
  setShowPopup,
  auth,
  getUserNotifications,
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

  const [image, setImage] = useState("");

  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);

  const [features, setFeatures] = useState([]);

  useEffect(() => {
    setValidName(name.length >= 3);
  }, [name]);

  useEffect(() => {
    setValidDescription(description.length >= 3 || description === "");
  }, [description]);

  const handleUsersNotification = async (e) => {
    try {
      const result = await axios.get(USERS_URL);
      console.log(result?.data);
      sendUserNotifications(result?.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.message);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Get users not found!");
        console.log(err);
      }
      errRef.current.focus();
    }
  };

  const sendUserNotifications = (allUsers) => {
    for (let i = 0; i < allUsers.length; i++) {
      handleNotification(allUsers[i]);
    }
  };

  const handleNotification = async (user) => {
    try {
      const result = await axios.post(
        NOTIFICATIONS_URL,
        JSON.stringify({
          user_id: user._id,
          title: "Fasilitas Baru Telah Tersedia",
          description: `Fasilitas baru dengan nama ${name} telah tersedia.`,
          link: "/fitur",
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

  const handleAdd = () => {
    if (features.length < 5) setFeatures([...features, ""]);
    else {
      setErrMsg("Features Can't be more than 5");
      errRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = name.length >= 3;
    const v2 = image !== "";
    const v3 = description.length >= 3 || description === "";
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    const formData = new FormData();
    formData.append("roles", auth.roles);
    formData.append("name", name);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("features", features);
    console.log(formData);
    try {
      const response = await axios.post(FACILITY_URL, formData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      getFacilities();
      handleUsersNotification();
      handleCancel();
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName("");
      setImage("");
      setDescription("");
      setFeatures([]);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Feature name and image are required");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Facility creation Failed");
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
          <h1 className='text-3xl font-semibold'>Tambahkan Fitur</h1>
          <form
            className='flex flex-col gap-2 mt-4 select-none'
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='name'>
                Nama Fitur{" "}
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
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='image'>Gambar Fitur</label>
              <input
                type='file'
                id='image'
                name='image'
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <div className='flex flex-col gap-[1.5px]'>
              <label htmlFor='description'>
                Deskripsi Fitur (opsional){" "}
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
              <input
                className='p-1 border-2 rounded-md border-slate-700'
                placeholder='Min. 3 karakter'
                id='description'
                type='text'
                autoComplete='off'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className='flex flex-col gap-[1.5px]'>
              <p>Fasilitas (Opsional)</p>
              {features.map((feature, i) => (
                <input
                  key={i}
                  type='text'
                  className='p-1 border-2 rounded-md border-slate-700'
                  placeholder='Min. 3 karakter'
                  autoComplete='off'
                  name={`feature-${i + 1}`}
                  onChange={(e) => {
                    let newFeatures = features;
                    newFeatures[i] = e.target.value;
                    setFeatures(newFeatures);
                    console.log(features);
                  }}
                  required
                />
              ))}
              <div className='mt-1'>
                <button
                  type='button'
                  onClick={handleAdd}
                  className='inline-block px-2 py-1 text-sm font-semibold text-white transition-colors duration-150 rounded-md hover:bg-primary-light bg-primary'
                >
                  Tambah
                </button>
              </div>
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

export default AddFacility;

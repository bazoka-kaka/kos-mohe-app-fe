import React, { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";

import handleUsersNotification from "./HandleUsersNotification";

const NAME_REGEX = /^[a-zA-Z ]{3,23}$/;
const FACILITIES_URL = "/facilities";

const UpdateFeature = ({
  setShowUpdate,
  getFacilities,
  auth,
  setSrc,
  facility,
  getUserNotifications,
}) => {
  const errRef = useRef();

  const handleCancel = () => {
    setShowUpdate(false);
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

  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);

  const [features, setFeatures] = useState([]);

  useEffect(() => {
    setValidName(name.length >= 3);
  }, [name]);

  useEffect(() => {
    setValidDescription(description.length >= 3 || description === "");
  }, [description]);

  const handleAdd = () => {
    if (features.length < 5) setFeatures([...features, ""]);
    else {
      setErrMsg("Features Can't be more than 5");
      errRef.current.focus();
    }
  };

  useEffect(() => {
    setName(facility.name);
    setDescription(facility.description);
    setFeatures(facility.features[0].split(","));
  }, []);

  const reloadImage = () => {
    setSrc(
      `http://localhost:3500/facilities/images/${facility._id}?${Date.now()}`
    );
  };

  const handleForget = () => {
    setName(facility.name);
    setDescription(facility.description);
    setFeatures(facility.features[0].split(","));
    setEditing(false);
  };

  const handleImageSubmit = async () => {
    const formData = new FormData();
    formData.append("roles", auth.roles);
    formData.append("image", image);

    try {
      const response = await axios.put(
        FACILITIES_URL + "/images/" + facility._id,
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
        setErrMsg("Feature Image Update Failed");
        console.log(err);
      }
      errRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = name.length >= 3;
    const v2 = description.length >= 3 || description === "";
    if (image !== "") {
      handleImageSubmit();
    }
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.put(
        FACILITIES_URL,
        JSON.stringify({
          id: facility._id,
          roles: auth.roles,
          name: name,
          description: description,
          features: features.join(","),
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
      toast.success("Fitur Berhasil Diupdate!");
      setSuccess(true);
      getFacilities();
      handleUsersNotification(
        auth,
        getUserNotifications,
        errRef,
        setErrMsg,
        `Fasilitas Berhasil Diupdate`,
        `Fasilitas dengan nama ${name} telah diupdate.`,
        "/fitur"
      );
      handleCancel();
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName("");
      setDescription("");
      setFeatures([]);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response?.message);
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Feature Update Failed");
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
          <h1 className='text-3xl font-semibold'>Edit Fasilitas</h1>
          <form
            className='flex flex-col gap-2 mt-4 select-none'
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
            <div className='flex flex-col gap-1'>
              <label htmlFor='name'>
                Nama Fasilitas{" "}
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
              <label htmlFor='description'>
                Deskripsi Fasilitas{" "}
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
              <textarea
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
              <label htmlFor='image'>Gambar Fasilitas</label>
              <input
                type='file'
                id='image'
                name='image'
                onChange={(e) => setImage(e.target.files[0])}
                className={!editing && "cursor-not-allowed"}
                disabled={!editing}
              />
              <a
                href={`http://localhost:3500/facilities/images/${facility._id}`}
                target='_blank'
                className='text-blue-700 transition duration-200 hover:text-red-600'
              >
                Lihat Gambar Sebelum Update
              </a>
            </div>
            <div className='flex flex-col gap-[1.5px]'>
              <p>Fitur (Opsional)</p>
              {features.map((feature, i) => (
                <div key={i} className='flex gap-2'>
                  <input
                    type='text'
                    className={`w-full border-[1px] border-slate-400 ${
                      !editing && "cursor-not-allowed bg-slate-200"
                    } px-2 py-1 text-sm rounded-md`}
                    placeholder={feature}
                    autoComplete='off'
                    name={`feature-${i + 1}`}
                    onChange={(e) => {
                      let newFeatures = features;
                      newFeatures[i] = e.target.value;
                      setFeatures(newFeatures);
                      console.log(features);
                    }}
                    disabled={!editing}
                    required
                  />
                  <button
                    type='button'
                    disabled={!editing}
                    onClick={() => {
                      const newFeatures = features.filter(
                        (item) => item !== feature
                      );
                      setFeatures(newFeatures);
                      console.log(newFeatures);
                    }}
                  >
                    <BsTrashFill
                      className={`transition duration-200  ${
                        !editing
                          ? "cursor-not-allowed text-slate-500"
                          : "text-red-600 hover:text-red-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
              <div className='mt-1'>
                {features.length < 5 && (
                  <button
                    type='button'
                    onClick={editing && handleAdd}
                    className={`inline-block px-2 py-1 text-sm font-semibold text-white transition-colors duration-150 ${
                      editing
                        ? "hover:bg-primary-light bg-primary"
                        : "cursor-not-allowed bg-slate-500"
                    } rounded-md `}
                  >
                    Tambah
                  </button>
                )}
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

export default UpdateFeature;

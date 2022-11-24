import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import useLogout from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../../api/axios";

const NAME_REGEX = /^[a-zA-Z ]{3,23}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
const PHONE_REGEX = /^\d{9,13}$/;
const USERS_URL = "/users";

const Account = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  // data
  const [user, setUser] = useState({});

  // logic handling
  const { auth } = useAuth();

  const errRef = useRef();
  const nameRef = useRef();

  const [editing, setEditing] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const [src, setSrc] = useState("");

  // errors and success
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // form data
  const [fullname, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);

  const [offers, setOffers] = useState(false);
  const [orderStatus, setOrderStatus] = useState(false);
  const [updates, setUpdates] = useState(false);

  const [image, setImage] = useState("");

  useEffect(() => {
    setValidName(NAME_REGEX.test(fullname));
  }, [fullname]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        USERS_URL + "/" + auth?.id,
        JSON.stringify({
          ...auth,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      setName(response?.data?.fullname);
      setEmail(response?.data?.email);
      setPhone(response?.data?.phone);
      setOffers(response?.data?.notifications?.offers);
      setOrderStatus(response?.data?.notifications?.orderStatus);
      setUpdates(response?.data?.notifications?.updates);
      setUser(response?.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("User Fetch Failed!");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserData();
    setSrc(`http://localhost:3500/users/images/${auth.id}?${Date.now()}`);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(fullname);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PHONE_REGEX.test(phone);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const updateFullname = fullname !== user.fullname ? fullname : "";
      const updateEmail = email !== user.email ? email : "";
      const updatePhone = phone !== user.phone ? phone : "";
      const response = await axios.put(
        USERS_URL + "/" + auth?.id,
        JSON.stringify({
          ...auth,
          fullname: updateFullname,
          email: updateEmail,
          phone: updatePhone,
          offers,
          orderStatus,
          updates,
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
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setEditing(false);
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

  const reloadImage = () => {
    setSrc(`http://localhost:3500/users/images/${auth.id}?${Date.now()}`);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roles", auth.roles);
    formData.append("image", image);

    try {
      const response = await axios.put(
        USERS_URL + "/images/" + auth?.id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      setChangeImage(false);
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(USERS_URL + "/images/" + auth?.id, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true,
      });
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

  return (
    <>
      <div className='min-h-[100vh] pt-[85.0667px] flex px-48'>
        <Sidebar />
        <section className='w-2/3 pl-6'>
          {/* title */}
          <h1 className='text-xl'>Account</h1>
          {/* content */}
          <div className='p-4 mt-4 border-[1.5px] rounded-lg border-slate-200'>
            <h2 className='font-semibold text-slate-700'>Informasi Personal</h2>
            {/* error message */}
            <p
              ref={errRef}
              className={`bg-red-400 text-white p-2 rounded-md ${
                errMsg ? "inline-block mb-4" : "hidden"
              }`}
              aria-live='assertive'
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className='text-white-400 '
              />{" "}
              {errMsg}
            </p>
            {/* change profile picture */}
            <div className='mt-4'>
              <h3 className='text-sm'>Avatar</h3>
              <form
                onSubmit={handleUpdate}
                className='flex items-center gap-6 mt-2'
              >
                <img className='w-24 rounded-lg' src={src} alt='' />
                {!changeImage && (
                  <>
                    <button
                      type='button'
                      onClick={() => setChangeImage(true)}
                      className='px-3 py-2 text-sm font-semibold border-2 rounded-md border-primary text-primary'
                    >
                      Ubah
                    </button>
                    <button
                      type='button'
                      onClick={handleDelete}
                      className='px-3 py-2 text-sm font-semibold text-slate-500'
                    >
                      Hapus
                    </button>
                  </>
                )}
                {changeImage && (
                  <>
                    <input
                      type='file'
                      name='image'
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                    <button className='inline-block px-2 py-1 text-sm font-semibold text-white transition-colors duration-150 rounded-md hover:bg-primary-light bg-primary'>
                      Update
                    </button>
                    <button
                      className='text-sm'
                      type='button'
                      onClick={() => setChangeImage(false)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </form>
            </div>
            {/* change profile information */}
            <form className='flex flex-col gap-8 mt-4'>
              {/* first part */}
              <div className='flex gap-2'>
                <div className='flex flex-col w-1/2 gap-1'>
                  <label className='text-sm' htmlFor='fullname'>
                    Nama Lengkap{" "}
                    {validName || !fullname ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={`text-green-400 ${
                          !fullname || !editing ? "hidden" : "inline"
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
                    className={`text-sm border-[1px] border-slate-400 ${
                      !editing && "cursor-not-allowed bg-slate-200"
                    } p-2 rounded-md`}
                    type='text'
                    id='fullname'
                    placeholder='Min. 3 karakter'
                    ref={nameRef}
                    autoComplete='off'
                    onChange={(e) => setName(e.target.value)}
                    value={fullname}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    disabled={!editing}
                  />
                </div>
                <div className='flex flex-col w-1/2 gap-1'>
                  <label className='text-sm' htmlFor='email'>
                    Email{" "}
                    {validEmail || !email ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={`text-green-400 ${
                          !email || !editing ? "hidden" : "inline"
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
                    className={`text-sm border-[1px] border-slate-400 ${
                      !editing && "cursor-not-allowed bg-slate-200"
                    } p-2 rounded-md`}
                    type='text'
                    id='email'
                    placeholder='example@gmail.com'
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    disabled={!editing}
                  />
                </div>
              </div>
              {/* second part */}
              <div className='flex gap-2'>
                <div className='flex flex-col w-1/2 gap-1'>
                  <label className='text-sm' htmlFor='phone'>
                    Nomor Telepon{" "}
                    {validPhone || !phone ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={`text-green-400 ${
                          !phone || !editing ? "hidden" : "inline"
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
                    className={`text-sm border-[1px] border-slate-400 ${
                      !editing && "cursor-not-allowed bg-slate-200"
                    } p-2 rounded-md`}
                    type='text'
                    id='phone'
                    placeholder='08xxxxxxxxxx'
                    autoComplete='off'
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                    aria-invalid={validPhone ? "false" : "true"}
                    disabled={!editing}
                  />
                </div>
              </div>
            </form>
            {/* notifications */}
            <div className='mt-6 mb-4'>
              <h2 className='font-semibold text-slate-700'>Notifikasi</h2>
              <ul className='flex flex-col gap-2 mt-2 text-sm'>
                <li className='flex gap-2 select-none'>
                  <input
                    type='checkbox'
                    name='offers'
                    id='offers'
                    value={offers}
                    onChange={() => setOffers(!offers)}
                    checked={offers}
                    disabled={!editing}
                  />{" "}
                  <label htmlFor='offers'>Tawaran Menarik</label>
                </li>
                <li className='flex gap-2 select-none'>
                  <input
                    type='checkbox'
                    name='status'
                    id='status'
                    value={orderStatus}
                    onChange={() => setOrderStatus(!orderStatus)}
                    checked={orderStatus}
                    disabled={!editing}
                  />{" "}
                  <label htmlFor='status'>Status Pemesanan</label>
                </li>
                <li className='flex gap-2 select-none'>
                  <input
                    type='checkbox'
                    name='updates'
                    id='updates'
                    value={updates}
                    onChange={() => setUpdates(!updates)}
                    checked={updates}
                    disabled={!editing}
                  />{" "}
                  <label htmlFor='updates'>Update Kos</label>
                </li>
              </ul>
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
              {/* second part */}
              <div className='flex gap-4'>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className='p-2 text-sm font-semibold border-2 rounded-md border-slate-400 text-slate-400'
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setEditing(false)}
                      className='p-2 text-sm font-semibold border-2 rounded-md border-slate-400 text-slate-400'
                    >
                      Lupakan Perubahan
                    </button>
                    <button
                      onClick={handleSubmit}
                      className='p-2 text-sm font-semibold text-white border-2 rounded-md bg-primary'
                    >
                      Simpan
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Account;

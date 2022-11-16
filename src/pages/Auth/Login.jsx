import React, { useState, useRef, useEffect } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  faInfoCircle,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // hide password
  const [showPwd, setShowPwd] = useState(false);

  // apis
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //console.log(JSON.stringify(response));
      const roles = response?.data?.roles;
      const fullname = response?.data?.fullname;
      const accessToken = response?.data?.accessToken;
      setAuth({ roles, fullname, accessToken });
      console.log(response?.data);
      setSuccess(true);
      setEmail("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <div className='min-h-[100vh] pt-[69.53px] flex'>
        {/* left */}
        {success ? (
          <div className='flex flex-col justify-center w-2/5 px-24 py-12'>
            {/* header */}
            <header>
              <h1 className='text-4xl font-semibold text-slate-700'>
                Login Success!
              </h1>
              <button
                className='mt-3 text-lg text-blue-500 transition duration-150 hover:text-red-500'
                onClick={() => navigate(from, { replace: true })}
              >
                Go Back
              </button>
            </header>
          </div>
        ) : (
          <div className='flex flex-col justify-center w-2/5 px-24 py-12'>
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
            {/* header */}
            <header>
              <h1 className='text-6xl font-semibold text-slate-700'>Login</h1>
              <p className='mt-3 text-lg text-slate-500'>
                Sign in dengan akun yang telah dibuat saat registrasi.
              </p>
            </header>
            {/* form */}
            <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <label htmlFor='email'>
                  Email{" "}
                  {validEmail || !email ? (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={`text-green-400 ${
                        !email ? "hidden" : "inline"
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
                  ref={emailRef}
                  className='p-2 border-2 border-gray-200 rounded-md'
                  id='email'
                  placeholder='name@example.com'
                  type='text'
                  autoComplete='off'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby='uidnote'
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id='uidnote'
                  className={`${
                    emailFocus && email && !validEmail ? "block" : "hidden"
                  } bg-black text-white p-2 rounded-md`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> Email must be valid.
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='#password'>Password</label>
                <div className='relative'>
                  <input
                    className='w-full p-2 border-2 border-gray-200 rounded-md'
                    type={showPwd ? "text" : "password"}
                    id='password'
                    placeholder='min. 8 karakter'
                    autoComplete='off'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    // aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby='uidnote'
                    // onFocus={() => setPwdFocus(true)}
                    // onBlur={() => setPwdFocus(false)}
                  />
                  <div className='absolute text-2xl text-gray-300 -translate-y-1/2 right-4 top-1/2'>
                    {showPwd ? (
                      <AiOutlineEyeInvisible
                        className='cursor-pointer'
                        onClick={() => setShowPwd(false)}
                      />
                    ) : (
                      <AiOutlineEye
                        className='cursor-pointer'
                        onClick={() => setShowPwd(true)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className='flex gap-2'>
                <input
                  className='w-5 border-4 border-gray-200'
                  type='checkbox'
                  name='persist'
                  id='persist'
                  onChange={togglePersist}
                  checked={persist}
                />
                <label htmlFor='persist'>Ingat akun</label>
              </div>
              {/* button */}
              <button
                className='inline-block w-full px-8 py-2 mt-8 font-semibold text-white transition-colors duration-200 rounded-md shadow-xl hover:bg-primary-light bg-primary'
                type='submit'
              >
                Login
              </button>
            </form>
            <Link
              className='mt-4 font-semibold text-center transition duration-200 text-primary hover:text-primary-light'
              to='login'
            >
              Lupa password
            </Link>
            <p className='mt-8 text-center'>
              Tidak punya akun?{" "}
              <Link
                className='font-semibold transition duration-200 text-primary hover:text-primary-light'
                to='login'
              >
                Sign Up
              </Link>
            </p>
          </div>
        )}

        {/* right */}
        <div className='flex items-center justify-center w-3/5 bg-primary-light'>
          <div className='flex flex-col items-center'>
            {/* image card */}
            <Link
              to='/kamar/deluxe'
              className='p-4 transition duration-200 bg-white rounded-lg shadow-2xl hover:-translate-y-1 w-80'
            >
              {/* image */}
              <img
                className='rounded-lg'
                src='/imgs/kamar/deluxe.png'
                alt='Kamar Deluxe'
              />
              {/* text */}
              <div className='mt-2'>
                {/* title */}
                <h2 className='font-semibold'>Deluxe Room</h2>
                {/* description */}
                <p className='text-xs text-slate-600'>
                  Kamar yang dilengkapi dengan Air Conditioner, berkapasitas 1
                  orang , dekat dengan jendela.
                </p>
                {/* price */}
                <p className='mt-2 text-xl font-bold'>Rp 850.000</p>
              </div>
            </Link>
            {/* text explanation */}
            <div className='w-2/3 mt-12 text-center'>
              <h1 className='text-3xl font-semibold text-white'>
                Kos Berkualitas
              </h1>
              <p className='mt-3 text-sm text-slate-200'>
                Semua kamar di Kos Mohe bersih, berkualitas dan memiliki harga
                yang pas sesuai dengan kebutuhan penyewa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

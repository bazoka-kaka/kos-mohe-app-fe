import React, { useState, useRef, useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  faInfoCircle,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";

const NAME_REGEX = /^[a-zA-Z ]{3,23}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  // hide password and retype password
  const [showPwd, setShowPwd] = useState(false);
  const [showRetypePwd, setShowRetypePwd] = useState(false);

  // apis
  const nameRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(name);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, pwd, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Nav />
      <section className='min-h-[100vh] pt-[69.53px] flex'>
        {/* left */}
        {success ? (
          <div className='flex flex-col justify-center w-2/5 px-24 py-12'>
            {/* header */}
            <header>
              <h1 className='text-4xl font-semibold text-slate-700'>
                Register Success!
              </h1>
              <p className='mt-3 text-lg text-blue-500 transition duration-150 hover:text-red-500'>
                <a href='/login'>Sign In</a>
              </p>
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
              <h1 className='text-6xl font-semibold text-slate-700'>
                Register
              </h1>
              <p className='mt-3 text-lg text-slate-500'>
                Buat akun baru dengan mengisi nama lengkap, email dan password.
              </p>
            </header>
            {/* form */}
            <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <label htmlFor='fullname'>
                  Nama Lengkap{" "}
                  {validName || !name ? (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={`text-green-400 ${
                        !name ? "hidden" : "inline"
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
                  className='p-2 border-2 border-gray-200 rounded-md'
                  placeholder='min. 3 karakter'
                  id='fullname'
                  type='text'
                  ref={nameRef}
                  autoComplete='off'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby='uidnote'
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                />
                <p
                  id='uidnote'
                  className={`${
                    nameFocus && name && !validName ? "block" : "hidden"
                  } bg-black text-white p-2 rounded-md`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
                  <br />
                  Only letters are allowed.
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='#email'>
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
                <label htmlFor='#password'>
                  Password{" "}
                  {validPwd || !pwd ? (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={`text-green-400 ${!pwd ? "hidden" : "inline"}`}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className='text-red-400 '
                    />
                  )}
                </label>
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
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
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
                <p
                  id='uidnote'
                  className={`${
                    pwdFocus && pwd && !validPwd ? "block" : "hidden"
                  } bg-black text-white p-2 rounded-md`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label='exclamation mark'>!</span>{" "}
                  <span aria-label='at symbol'>@</span>{" "}
                  <span aria-label='hashtag'>#</span>{" "}
                  <span aria-label='dollar sign'>$</span>{" "}
                  <span aria-label='percent'>%</span>
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='#retype-password'>
                  Ketik Ulang Password{" "}
                  {validMatch || !matchPwd ? (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={`text-green-400 ${
                        !matchPwd ? "hidden" : "inline"
                      }`}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className='text-red-400'
                    />
                  )}
                </label>
                <div className='relative'>
                  <input
                    className='w-full p-2 border-2 border-gray-200 rounded-md'
                    type={showRetypePwd ? "text" : "password"}
                    id='retype-password'
                    name='retype-password'
                    placeholder='min. 8 karakter'
                    autoComplete='off'
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <div className='absolute text-2xl text-gray-300 -translate-y-1/2 right-4 top-1/2'>
                    {showRetypePwd ? (
                      <AiOutlineEyeInvisible
                        className='cursor-pointer'
                        onClick={() => setShowRetypePwd(false)}
                      />
                    ) : (
                      <AiOutlineEye
                        className='cursor-pointer'
                        onClick={() => setShowRetypePwd(true)}
                      />
                    )}
                  </div>
                </div>
                <p
                  id='uidnote'
                  className={`${
                    matchFocus && matchPwd && !validMatch ? "block" : "hidden"
                  } bg-black text-white p-2 rounded-md`}
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> Password must match.
                </p>
              </div>

              {/* button */}
              <button
                disabled={
                  !validName || !validEmail || !validPwd || !validMatch
                    ? true
                    : false
                }
                className={
                  !validName || !validEmail || !validPwd || !validMatch
                    ? `inline-block cursor-not-allowed w-full px-8 py-2 mt-8 font-semibold text-white transition-colors duration-200 rounded-md shadow-xl bg-slate-500`
                    : `inline-block cursor-pointer w-full px-8 py-2 mt-8 font-semibold text-white transition-colors duration-200 rounded-md shadow-xl hover:bg-primary-light bg-primary`
                }
                type='submit'
              >
                Register
              </button>
            </form>
            <p className='mt-4 text-center'>
              Sudah punya akun?{" "}
              <a
                className='transition duration-200 text-primary hover:text-primary-light'
                href='login'
              >
                Login
              </a>
            </p>
          </div>
        )}
        {/* right */}
        <div className='flex items-center justify-center w-3/5 bg-primary-light'>
          <div className='flex flex-col items-center'>
            {/* image card */}
            <a
              href='/kamar/deluxe'
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
            </a>
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
      </section>
      <Footer />
    </>
  );
};

export default Register;

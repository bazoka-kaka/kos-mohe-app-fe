import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emailjs from "@emailjs/browser";
import { useNavigate, useLocation } from "react-router-dom";

const NAME_REGEX = /^[a-zA-Z ]{3,23}$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

const Contact = () => {
  // navigation
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // apis
  const nameRef = useRef();
  const form = useRef();
  const errRef = useRef();

  // validation
  const [fullname, setFullname] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [message, setMessage] = useState("");
  const [validMessage, setValidMessage] = useState(false);
  const [messageFocus, setMessageFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(NAME_REGEX.test(fullname));
  }, [fullname]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidMessage(message.length >= 10);
  }, [message]);

  useEffect(() => {
    setErrMsg("");
  }, [fullname, email, phone, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(fullname);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PHONE_REGEX.test(phone);
    const v4 = message.length >= 10;
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    emailjs
      .sendForm(
        "service_vp241z9",
        "template_6smf4dt",
        form.current,
        "M9HVybWlV95gqjVxZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          setFullname("");
          setEmail("");
          setPhone("");
          setMessage("");
          setSuccess(true);
        },
        (error) => {
          setErrMsg(error.text);
          errRef.current.focus();
        }
      );
  };
  return (
    <>
      {success ? (
        <section className='flex flex-col justify-center w-2/5 min-h-[100vh] px-24 py-12'>
          {/* header */}
          <header>
            <h1 className='text-4xl font-semibold text-slate-700'>
              Message Sent!
            </h1>
            <button
              className='mt-3 text-lg text-blue-500 transition duration-150 hover:text-red-500'
              onClick={() => setSuccess(false)}
            >
              Go Back
            </button>
          </header>
        </section>
      ) : (
        <section className='min-h-[100vh] flex flex-col justify-center pt-[85.0667px] px-48'>
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
          {/* title */}
          <h1 className='text-4xl'>Kontak</h1>
          <form
            ref={form}
            onSubmit={handleSubmit}
            className='flex flex-col gap-2 mt-4'
          >
            <div className='flex flex-col gap-1'>
              <label htmlFor='fullname'>
                Nama Lengkap{" "}
                {validName || !fullname ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !fullname ? "hidden" : "inline"
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
                className='p-2 border-2 rounded-md border-slate-700'
                type='text'
                id='fullname'
                name='fullname'
                placeholder='Min. 3 Karakter'
                ref={nameRef}
                autoComplete='off'
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='phone'>
                No. Telpon{" "}
                {validPhone || !phone ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${!phone ? "hidden" : "inline"}`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className='text-red-400 '
                  />
                )}
              </label>
              <input
                className='p-2 border-2 rounded-md border-slate-700'
                type='text'
                placeholder='08xxxxxxxxxx'
                id='phone'
                name='phone'
                autoComplete='off'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                aria-invalid={validPhone ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='email'>
                Email{" "}
                {validEmail || !email ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${!email ? "hidden" : "inline"}`}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className='text-red-400 '
                  />
                )}
              </label>
              <input
                className='p-2 border-2 rounded-md border-slate-700'
                type='text'
                id='email'
                name='email'
                placeholder='example@test.com'
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='message'>
                Pesan{" "}
                {validMessage || !message ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={`text-green-400 ${
                      !message ? "hidden" : "inline"
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
                id='message'
                name='message'
                className='h-48 p-2 border-2 rounded-md border-slate-700'
                placeholder='Masukkan pesan anda di sini'
                autoComplete='off'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                required
                aria-invalid={validMessage ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setMessageFocus(true)}
                onBlur={() => setMessageFocus(false)}
              />
            </div>
            <div className='mt-4'>
              <button className='inline-block px-8 py-2 font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'>
                Submit
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Contact;

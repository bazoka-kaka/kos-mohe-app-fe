import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  faInfoCircle,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NAME_REGEX = /^[a-zA-Z ]{3,23}$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

const Contact = () => {
  // apis
  const nameRef = useRef();
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

  const handleSubmit = () => {};
  return (
    <section className='min-h-[100vh] flex flex-col justify-center pt-[85.0667px] px-48'>
      {/* title */}
      <h1 className='text-4xl'>Kontak</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-4'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='fullname'>
            Nama Lengkap{" "}
            {validName || !fullname ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={`text-green-400 ${!fullname ? "hidden" : "inline"}`}
              />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} className='text-red-400 ' />
            )}
          </label>
          <input
            className='p-2 border-2 rounded-md border-slate-700'
            type='text'
            id='fullname'
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
              <FontAwesomeIcon icon={faCircleXmark} className='text-red-400 ' />
            )}
          </label>
          <input
            className='p-2 border-2 rounded-md border-slate-700'
            type='text'
            placeholder='08xxxxxxxxxx'
            id='phone'
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
              <FontAwesomeIcon icon={faCircleXmark} className='text-red-400 ' />
            )}
          </label>
          <input
            className='p-2 border-2 rounded-md border-slate-700'
            type='text'
            id='email'
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
                className={`text-green-400 ${!message ? "hidden" : "inline"}`}
              />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} className='text-red-400 ' />
            )}
          </label>
          <textarea
            id='message'
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
  );
};

export default Contact;

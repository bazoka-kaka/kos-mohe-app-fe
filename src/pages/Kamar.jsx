import { CiUser } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";

const NAME_REGEX = /^[a-zA-Z ]{3,23}$/;
const KAMAR_URL = "/rooms";

const Kamar = ({ kamar }) => {
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const handleCancel = () => {
    setShowPopup(false);
  };
  const refresh = useRefreshToken();

  const errRef = useRef();

  // errors and success
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // form data
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = NAME_REGEX.test(name);
    const v2 = price > 0;
    const v3 = quantity > 0;
    const v4 = description.length > 3;
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        KAMAR_URL,
        JSON.stringify({
          ...auth,
          name,
          price,
          quantity,
          description,
          ac,
          kmandi,
          capacity,
          featured,
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
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName("");
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
        setErrMsg("Name and price are required");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Kamar creation Failed");
        console.log(err);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {/* pop up form */}
      {showPopup && (
        <>
          {/* transparent layer */}
          <div className='absolute top-0 z-10 left-0 w-full min-h-[calc(100vh+85.0667px)] bg-black opacity-30'></div>
          {/* create new room form */}
          <div className='absolute z-20 w-full flex items-center justify-center min-h-[calc(100vh+85.0667px)]'>
            <div className='w-1/2 px-8 py-6 bg-white border-2 rounded-md border-slate-700'>
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
              <h1 className='text-3xl font-semibold'>Tambahkan Kamar</h1>
              <form className='flex flex-col gap-2 mt-4 select-none'>
                <div className='flex flex-col gap-[1.5px]'>
                  <label htmlFor='name'>
                    Nama Kamar{" "}
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
                  <label htmlFor='price'>
                    Harga Kamar{" "}
                    {validPrice || !price ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={`text-green-400 ${
                          !price ? "hidden" : "inline"
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
                    placeholder='Hanya masukkan angka'
                    id='price'
                    type='number'
                    autoComplete='off'
                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                    value={price}
                    required
                    aria-invalid={validPrice ? "false" : "true"}
                  />
                </div>
                <div className='flex flex-col gap-[1.5px]'>
                  <label htmlFor='quantity'>
                    Jumlah Kamar{" "}
                    {validQuantity || !quantity ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={`text-green-400 ${
                          !quantity ? "hidden" : "inline"
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
                    placeholder='Hanya masukkan angka'
                    id='quantity'
                    type='number'
                    autoComplete='off'
                    onChange={(e) => setQuantity(e.target.valueAsNumber)}
                    value={quantity}
                    required
                    aria-invalid={validQuantity ? "false" : "true"}
                  />
                </div>
                <div className='flex flex-col gap-[1.5px]'>
                  <label htmlFor='description'>
                    Deskripsi Kamar{" "}
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
                    placeholder='Opsional, Min. 3 karakter'
                    id='description'
                    type='text'
                    autoComplete='off'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                    aria-invalid={validDescription ? "false" : "true"}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='gambar'>Gambar Kamar</label>
                  <input type='file' id='gambar' />
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
                          />{" "}
                          <label htmlFor='featured-no'>Tidak</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-2'>
                  <button
                    onClick={handleSubmit}
                    className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-black hover:bg-slate-700 rounded-2xl'
                  >
                    Simpan
                  </button>
                  <button
                    onClick={handleCancel}
                    className='inline-block px-8 py-2 text-sm font-semibold text-white transition-colors duration-150 bg-red-500 hover:bg-red-400 rounded-2xl'
                  >
                    Batalkan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <div className='min-h-[100vh] pt-[85.0667px] px-48'>
        {/* header */}
        <header className='flex items-center gap-4 pt-6'>
          {/* title */}
          <h1 className='text-3xl'>Kamar Kos Mohe</h1>
          {auth?.roles?.includes(5150) && (
            <button
              onClick={() => setShowPopup(true)}
              className='flex items-center px-4 py-1 font-semibold text-white transition-colors duration-150 hover:bg-primary-light rounded-2xl bg-primary'
            >
              Tambah Kamar
            </button>
          )}
        </header>
        <section id='kamar' className='py-6'>
          {/* content */}
          <div className='grid grid-cols-3 pb-6 gap-x-4 gap-y-6'>
            {kamar.map((item, i) => (
              <Link
                key={i}
                to={item.url}
                className='duration-75 border-[1px] transform rounded-2xl hover:scale-[101%]'
              >
                <div className='relative'>
                  <img
                    src={`${item.img}`}
                    alt={`${item.title}`}
                    className='rounded-t-2xl'
                  />
                  {item.featured && (
                    <div className='absolute top-[1px] right-[1px] px-2 py-1 text-sm text-white bg-primary rounded-bl-2xl rounded-tr-2xl'>
                      Featured
                    </div>
                  )}
                </div>
                <div className='p-4'>
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                  <p className='text-sm'>
                    <CiUser className='inline' /> {item.people} orang{" "}
                    <BsDot className='inline' /> Rp {item.price}
                  </p>
                  <ul className='flex flex-wrap gap-2 mt-5 text-sm'>
                    {item.features.map((feature, i) => (
                      <li key={i} className='px-3 py-1 bg-[#EDEEF2] rounded-xl'>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Kamar;

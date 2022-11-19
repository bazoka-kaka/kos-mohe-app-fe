import React from "react";
import Sidebar from "../../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";

import useAuth from "../../../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const USERS_URL = "/users";

const Security = () => {
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

  // errors and success
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // form data
  const [oldPwd, setOldPwd] = useState("");
  const [validOld, setValidOld] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [matchPwd]);

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
      setOldPwd(response?.data?.pwd);
      setUser(response?.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("User Fetch failed!");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleForgetChange = () => {
    setOldPwd("");
    setPwd("");
    setMatchPwd("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = PWD_REGEX.test(pwd);
    const v2 = matchPwd === pwd;
    const v3 = oldPwd.length > 0;
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.put(
        USERS_URL + "/" + auth?.id,
        JSON.stringify({
          ...auth,
          oldPwd,
          pwd,
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
      setOldPwd("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Password Update Failed");
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
          <h1 className='text-xl'>Security</h1>
          {/* content */}
          <div className='p-4 mt-4 border-[1.5px] rounded-lg border-slate-200'>
            <h2 className='font-semibold text-slate-700'>Ganti Password</h2>
            {/* change password */}
            <form className='flex flex-col gap-2 mt-4'>
              <div className='flex flex-col w-1/2 gap-1'>
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
                {/* change password */}
                <label className='text-sm' htmlFor='old-pass'>
                  Password Lama
                </label>
                <input
                  className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                  type='password'
                  id='old-pass'
                  placeholder='xxxxxxxx'
                  autoComplete='off'
                  onChange={(e) => setOldPwd(e.target.value)}
                  value={oldPwd}
                  required
                  aria-invalid={validOld ? "false" : "true"}
                />
              </div>
              <div className='flex flex-col w-1/2 gap-1'>
                <label className='text-sm' htmlFor='new-pass'>
                  Password Baru{" "}
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
                <input
                  className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                  type='password'
                  id='new-pass'
                  placeholder='xxxxxxxx'
                  autoComplete='off'
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                />
              </div>
              <div className='flex flex-col w-1/2 gap-1'>
                <label className='text-sm' htmlFor='new-pass-confirm'>
                  Konfirmasi Password{" "}
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
                      className='text-red-400 '
                    />
                  )}
                </label>
                <input
                  className='text-sm border-[1px] border-slate-400 p-2 rounded-md'
                  type='password'
                  id='new-pass-confirm'
                  placeholder='xxxxxxxx'
                  autoComplete='off'
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                />
              </div>
            </form>

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
                <button
                  onClick={handleForgetChange}
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Security;

import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { setIsLoadAuth } from "../store/Auth/AuthSlicer";

const Login = () => {
  const form = useRef();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form.current));
    if (data.email && data.password) {
      dispatch(setIsLoadAuth(true));
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((_) => {
          dispatch(setIsLoadAuth(false));
          nav("/main");
        })
        .catch((_) => {
          toast.error("Something Went Wrong");
          dispatch(setIsLoadAuth(false));
        });
    } else {
      toast.error("Email And Password Required");
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-white">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="space-y-[20px] px-[30px] py-[30px] rounded-[10px]"
      >
        <h1 className="font-pop font-bold text-[30px]">
          Log In To Your Account
        </h1>
        <div className="space-y-[5px]">
          <label htmlFor="email" className="text-slate-800 font-pop font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="font-pop outline-none px-[10px] py-[10px] text-[13px] w-full bg-gray-200 bg-opacity-60 border rounded-[5px] focus:border-primary"
          />
        </div>
        <div className="space-y-[10px]">
          <label htmlFor="password" className="text-slate-800 font-pop font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="font-pop outline-none px-[10px] py-[10px] text-[13px] w-full bg-gray-200 bg-opacity-60 border rounded-[5px] focus:border-primary"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-[40px] py-[7px] rounded-[5px] text-white text-[14px] font-medium tracking-wider mx-auto w-fit"
        >
          Log In
        </button>
        <p className="font-pop text-[13px]">
          Doesn't have an account ?{" "}
          <NavLink to="/register" className="text-primary cursor-pointer">
            Register here
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;

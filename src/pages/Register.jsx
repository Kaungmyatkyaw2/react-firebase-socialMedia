import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import useImageAddress from "../helper/useImageAddress";
import { setIsLoadAuth } from "../store/Auth/AuthSlicer";

const Register = () => {
  const form = useRef();
  const imgClick = useRef();
  const nav = useNavigate();
  const [img, imageHandler] = useImageAddress();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form.current));

    if (data.password !== data.confirm_password) {
      return toast.error("Password Doesn't Match");
    } else {
      if (
        data.password &&
        data.userName &&
        data.email &&
        img
      ) {
        dispatch(setIsLoadAuth(true));
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((res) => {
            addDoc(collection(db, "users"), {
              displayName: `${data.userName}`,
              photoUrl: img,
              id: res.user.uid,
            })
              .then((_) => {
                dispatch(setIsLoadAuth(false));
                nav("/main");
              })
              .catch((_) => {
                toast.error("Something went wrong");
                dispatch(setIsLoadAuth(false));
              });
          })
          .catch((_) => dispatch(setIsLoadAuth(false)));
      } else {
        return toast.error("All Infomation Should Be Filled");
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center py-[50px] bg-white">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="w-[400px] space-y-[20px] p-[30px]"
      >
        <h1 className="font-pop font-bold text-[30px]">Sign-Up</h1>
        <div className="space-y-[10px]">
          <label htmlFor="email" className="text-slate-800 font-pop font-bold">
            Username
          </label>
          <input
            type="text"
            name="userName"
            className="font-pop outline-none px-[10px] py-[10px] text-[13px] w-full bg-gray-200 bg-opacity-60 border rounded-[5px] focus:border-primary"
            placeholder="Username"
          />
        </div>

        <div className="space-y-[10px]">
          <label htmlFor="email" className="text-slate-800 font-pop font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="font-pop outline-none px-[10px] py-[10px] text-[13px] w-full bg-gray-200 bg-opacity-60 border rounded-[5px] focus:border-primary"
            placeholder="Email Address"
          />
        </div>


        <div className="space-y-[10px]">
          <label htmlFor="email" className="text-slate-800 font-pop font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="font-pop outline-none px-[10px] py-[10px] text-[13px] w-full bg-gray-200 bg-opacity-60 border rounded-[5px] focus:border-primary"
            placeholder="Password"
          />
        </div>

        <div className="space-y-[10px]">
          <label htmlFor="email" className="text-slate-800 font-pop font-bold">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            className="font-pop outline-none px-[10px] py-[10px] text-[13px] w-full bg-gray-200 bg-opacity-60 border rounded-[5px] focus:border-primary"
            placeholder="Confirm Password"
          />
        </div>
        
        <input
          ref={imgClick}
          type="file"
          className="hidden"
          onChange={(e) => imageHandler(e.target.files[0])}
        />
        <div
          onClick={() => imgClick.current.click()}
          className="w-fit rounded-[10px] overflow-hidden text-[12px] tracking-wide font-pop flex border border-gray-300 cursor-pointer"
        >
          <h1 className="bg-gray-200 px-[10px] py-[10px] w-fit text-black font-medium">
            Choose Picture
          </h1>
          <p className="py-[10px] px-[10px]">
            {img ? "Image Chossen" : "No File Chossen"}
          </p>
        </div>
          <button
            type="submit"
            className="bg-primary px-[40px] py-[7px] rounded-[5px] text-white text-[14px] font-medium tracking-wider mx-auto w-fit"
          >
            Sign Up
          </button>
        <p className="font-pop text-[13px]">
          Already have an account ?{" "}
          <NavLink to="/" className="text-primary cursor-pointer">
            Sign In
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;

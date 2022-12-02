import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { setIsLoadAuth } from '../store/Auth/AuthSlicer';


const Login = () => {

  const form = useRef();
  const nav = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form.current))
    if(data.email && data.password){
        dispatch(setIsLoadAuth(true))
        signInWithEmailAndPassword(auth,data.email,data.password)
        .then(_ => {
          dispatch(setIsLoadAuth(false))
          nav("/main")
        })
        .catch(_ => {
          toast.error("Something Went Wrong")
          dispatch(setIsLoadAuth(false))
        })
    }else{
        toast.error("Email And Password Required")
    }
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        <form ref={form} onSubmit={handleSubmit} className='w-[350px] space-y-[20px] bg-white px-[30px] py-[30px] rounded-[10px] shadow-md'>
            <h1 className='font-pop font-bold text-[20px] text-center'>Log In</h1>
            <input type="email" name='email' className='border border-gray-400 font-pop outline-none px-[10px] py-[10px] text-[13px] w-full' placeholder='Email Address'/>
            <input type="password" name='password' className='border border-gray-400 font-pop outline-none px-[10px] py-[10px] text-[13px] w-full' placeholder='Password'/>
            <div className='flex justify-center'>
                <button type='submit' className='bg-red-600 px-[40px] py-[7px] rounded-[5px] text-white text-[14px] font-medium tracking-wider mx-auto w-full'>Log In</button>
            </div>
            <p className='text-center font-pop text-[13px]'>Doesn't have an account ? <NavLink to='/register' className='text-primary cursor-pointer'>Register here</NavLink></p>
        </form>
    </div>
  )
}

export default Login
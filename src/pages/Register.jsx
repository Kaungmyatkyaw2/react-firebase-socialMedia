import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import useImageAddress from '../helper/useImageAddress';
import { setIsLoadAuth } from '../store/Auth/AuthSlicer';

const Register = () => {

  const form = useRef();
  const imgClick = useRef()
  const nav = useNavigate();
  const [img,imageHandler] = useImageAddress()
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form.current))

    if (data.password !== data.confirm_password) {
       return toast.error("Password Doesn't Match")
    }else{
        if (data.password && data.firstName && data.lastName && data.email && img) {
          dispatch(setIsLoadAuth(true))
            createUserWithEmailAndPassword(auth,data.email,data.password).then(res => {

              addDoc(collection(db,'users'),{
                displayName : `${data.firstName} ${data.lastName}`,
                photoUrl : img,
                id : res.user.uid
              }).then(_ => {
                dispatch(setIsLoadAuth(false))
                nav('/main')
              })
              .catch(_ => {
                toast.error("Something went wrong")
                dispatch(setIsLoadAuth(false))
              })

            }).catch(_ => dispatch(setIsLoadAuth(false)))
        }else{
            return toast.error("All Infomation Should Be Filled")
        }
    }
    
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center bg-img'>
        <form ref={form} onSubmit={handleSubmit} className='w-[400px] space-y-[20px] p-[30px] bg-blur border rounded-[10px] shadow-md'>
            <h1 className='font-pop font-bold text-[20px] text-center'>Sign-Up</h1>
            <div className='w-full flex justify-between'>
                 <input type="text" name='firstName' className='border border-gray-400 font-pop outline-none px-[10px] py-[10px] text-[13px] w-[49%]' placeholder='First Name' />
                 <input type="text" name='lastName' className='border border-gray-400 font-pop outline-none px-[10px] py-[10px] text-[13px] w-[49%]' placeholder='Last Name' />
            </div>
            <input type="text" name='email' className='border border-gray-400 font-pop outline-none px-[10px] py-[10px] text-[13px] w-full' placeholder='Email Address'/>
            <div className='w-full flex justify-between'>
                 <input type="text" name='password' className='border border-gray-400 font-pop outline-none px-[10px] py-[10px] text-[13px] w-[49%]' placeholder='Password' />
                 <input type="text" name='confirm_password' className='border border-gray-400 font-pop outline-none px-[10px] py-[10px] text-[13px] w-[49%]' placeholder='Confirm Password' />
            </div>
            <input ref={imgClick} type="file" className='hidden' onChange={(e) => imageHandler(e.target.files[0])} />
            <div onClick={() => imgClick.current.click()} className='w-full text-[12px] tracking-wide font-pop flex border border-gray-800 cursor-pointer'>
              <h1 className='bg-slate-900 px-[10px] py-[7px] w-fit text-white'>Choose Picture</h1>
              <p className='py-[7px] px-[10px]'>{img ? "Image Chossen" : 'No File Chossen'}</p>
            </div>
            <div className='flex justify-center'>
                <button type='submit' className='bg-primary px-[40px] py-[7px] rounded-[5px] text-white text-[14px] font-medium tracking-wider mx-auto w-full'>Sign Up</button>
            </div>
            <p className='text-center font-pop text-[13px]'>Already have an account ? <NavLink to='/' className='text-red-500 cursor-pointer'>Sign In</NavLink></p>
        </form>
    </div>
  )
}

export default Register
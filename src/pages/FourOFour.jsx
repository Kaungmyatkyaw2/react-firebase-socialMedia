import Lottie from 'lottie-react'
import { NavLink } from 'react-router-dom'
import error from './../assets/lottie/404.json'

const FourOFour = () => {
  return (
    <div className='h-[100vh] toCenter'>
        <div className='flex space-x-[30px] items-center justify-center sm:flex-row flex-col'>
        <div className='w-[150px]'>
            <Lottie animationData={error}> </Lottie>
        </div>
        <div className='flex flex-col items-center'>
        <h1 className='text-[35px]'>Error 404</h1>
        <p className='font-pop text-center'>Page Nout Found</p>
        <NavLink to='/main' className='font-pop text-center text-primary text-[13px] mt-[10px]'>Back Home</NavLink>
        </div>
        </div>
    </div>
  )
}

export default FourOFour
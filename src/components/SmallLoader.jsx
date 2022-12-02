import Lottie from 'lottie-react';
import loader from '../assets/lottie/loading.json'

const SmallLoader = () => {
  return (
    <div className='absolute top-0 left-0 rounded-[10px] w-full h-full toCenter bg-white bg-opacity-[0.7]'>
    <div className='w-[70px]'>
        <Lottie animationData={loader} autoPlay loop></Lottie>  
    </div>
</div>  )
}

export default SmallLoader
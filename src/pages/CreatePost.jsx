import { useRef, useState } from 'react';
import { BsX } from 'react-icons/bs';
import {FcImageFile} from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { toggleUserModal } from '../store/useraction/UserActionSlicer';
import {motion} from 'framer-motion'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import useImageAddress from '../helper/useImageAddress';
import SmallLoader from '../components/SmallLoader';

const CreatePost = () => {

    const user = useSelector(state => state.auth.user);
    const show = useSelector(state => state.useraction.createModal);
    const form = useRef();
    const [load,setLoad] = useState(false)
    const dispatch = useDispatch();
    const [img,handleImage] = useImageAddress()

    const handlePost = async (e) => {
        e.preventDefault()

        if (form.current[0].value) {
            try{
                setLoad(true)
                await addDoc(collection(db,'posts'),{
                    description : form.current[0].value,
                    image : img,
                    author : user?.displayName,
                    authorId : user?.id,
                    authorImage : user?.photoUrl,
                    comment : [],
                    created : serverTimestamp(),
                    create_time : `${new Date().getFullYear()} - ${new Date().getMonth()} - ${new Date().getDate()}`
                }
                )
                toast.success("Posted Successfully")
                setLoad(false)
            }catch (error){
                toast.error("Something Went Wrong")
                setLoad(false)
            }
            dispatch(toggleUserModal())
        }else{
            toast.error("Text must be filled")
        }

    }
 

  return (
    show && (
            <motion.div key='modal' exit={{scale:0}} initial={{scale:0}} animate={{scale:1}} className='fixed top-0 left-0 w-full h-[100vh] bg-white bg-opacity-[0.4] z-[999] toCenter'>
                <div className='w-[400px] bg-white shadow-cus rounded-[10px]'>

                    {
                        load && <SmallLoader/>
                    }

                    <div className='border-b py-[15px] relative'>
                        <h1 className='text-center font-bold font-pop'>Create Post</h1>
                        <div className='absolute top-[50%] right-[5%] translate-y-[-50%] text-[25px] cursor-pointer' onClick={() => dispatch(toggleUserModal())}>
                            <BsX/>
                        </div>
                    </div>
                    <div className=' px-[20px] py-[20px] space-y-[20px]'>
                        <div className='flex items-center space-x-[10px]'>
                            <img className='rounded-btn !w-[50px] !h-[50px] object-cover' src={user?.photoUrl} alt="" />
                            <h1 className='font-bold text-[15px]'>{user?.displayName}</h1>
                        </div>
                        <form ref={form} onSubmit={handlePost}>
                            <textarea className='w-full h-[130px] outline-none resize-none' placeholder='What is on your mind?'></textarea>
                            <div className='border border-gray-300 py-[10px] px-[10px] shadow-sm rounded-[5px] flex justify-between'>
                                <input type="file" onChange={() => handleImage(form?.current[1].files[0])} className='hidden' />
                                <h1 className='font-bold'>{img ? form?.current[1].value : 'Add to your post'}</h1>
                                <div>
                                    <div onClick={() => (form?.current[1].click())}>
                                        <FcImageFile className='text-[22px] cursor-pointer'/>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <button onClick={handlePost}  className='w-full bg-primary py-[10px] rounded-[5px] text-white font-bold'>Post</button>
                    </div>
                </div>
            </motion.div>     )
  )
}

export default CreatePost

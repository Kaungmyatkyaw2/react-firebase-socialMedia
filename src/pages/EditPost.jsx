import { useRef, useState } from 'react';
import { BsX } from 'react-icons/bs';
import {FcImageFile} from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import {motion} from 'framer-motion'
import useImageAddress from '../helper/useImageAddress';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import SmallLoader from '../components/SmallLoader';

const EditPost = ({post,setShow}) => {

    const user = useSelector(state => state.auth.user);
    const form = useRef();
    const [img,handleImage] = useImageAddress()
    const dispatch = useDispatch();
    const [load,setLoad] = useState(false)

    const handleEditPost = () => {
        setLoad(true)
        updateDoc(doc(db,'posts',post.id),{
            description : form.current[0].value,
            image : img ? img : post.image
        }).then(() => {
            setLoad(false)
            setShow(false)
        }).catch((e) => {
            toast.error(e)
            setLoad(false)
        })
    }


  return (
            <motion.div key='modal' exit={{scale:0}} initial={{scale:0}} animate={{scale:1}} className='fixed top-0 left-0 w-full h-[100vh] bg-white bg-opacity-[0.4] z-[999] toCenter'>
                <div className='w-[400px] bg-white shadow-cus rounded-[10px] relative'>
                    {
                        load && (
                            <SmallLoader/>
                        )
                    }
                    <div className='border-b py-[15px] relative'>
                        <h1 className='text-center font-bold font-pop'>Edit Post</h1>
                        <div className='absolute top-[50%] right-[5%] translate-y-[-50%] text-[25px] cursor-pointer' onClick={() => setShow(false)}>
                            <BsX/>
                        </div>
                    </div>
                    <div className=' px-[20px] py-[20px] space-y-[20px]'>
                        <div className='flex items-center space-x-[10px]'>
                            <img className='rounded-btn !w-[50px] !h-[50px]' src="https://scontent.frgn7-3.fna.fbcdn.net/v/t39.30808-1/309028348_612947263895538_3289164825885167559_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=103&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=Le4Fg3tqjFIAX-FyfRu&_nc_ht=scontent.frgn7-3.fna&oh=00_AfBjH9HNGqy8V_pNphjvdkIPtWYWpIwYZP0QQTLlDS3iOw&oe=63840BE0" alt="" />
                            <h1 className='font-bold text-[15px]'>{user?.displayName}</h1>
                        </div>
                        <form ref={form} onSubmit={handleEditPost}>
                            <textarea defaultValue={post.description} className='w-full h-[130px] outline-none resize-none' placeholder='What is on your mind?'></textarea>
                            <div className='border border-gray-300 py-[10px] px-[10px] shadow-sm rounded-[5px] flex justify-between'>
                                <input type="file" onChange={() => handleImage(form.current[1].files[0])} className='hidden' />
                                <h1 className='font-bold'>{img ? form.current[1].value : 'Add to your post'}</h1>
                                <div>
                                    <div onClick={() => (form.current[1].click())}>
                                        <FcImageFile className='text-[22px] cursor-pointer'/>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <button onClick={handleEditPost}  className='w-full bg-primary py-[10px] rounded-[5px] text-white font-bold'>Post</button>
                    </div>
                </div>
            </motion.div>     )
  
}

export default EditPost

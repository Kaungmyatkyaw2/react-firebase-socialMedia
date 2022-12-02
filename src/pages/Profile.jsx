import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { db } from '../firebase'

const Profile = () => {

    const {id} = useParams()
    const [profile,setProfile] = useState()
    const [myPost,setMyPost] = useState([])
    const post = useSelector(state => state.auth.posts)

    const findProfile = query(collection(db,'users'),where('id','==',id))

    useEffect(() => {
        onSnapshot(findProfile,(snap) => {
            snap.docs.forEach(i => setProfile(i.data()))
        })          
            setMyPost(post.filter(i => i.authorId == id))
    },[post])

  return (
        <div className='md:ml-[25%] md:w-[50%] w-full toCenter md:py-[20px] py-[40px]'>
            <div className='md:w-[90%] w-full toCenter !flex-col bg-white pb-[30px]'>
                <div className='w-full pb-[10px]'>
                    <img className='w-full h-[300px] object-cover object-top rounded-[5px]' src={'https://static1.cbrimages.com/wordpress/wp-content/uploads/2017/02/Anakin-VS-Obi-Wan.jpg'} alt="" />
                    <div className='flex items-center space-x-[20px] pl-[40px]'>
                        <img className='rounded-btn object-cover !w-[100px] !h-[100px] mt-[-50px]' src={profile?.photoUrl} alt="" />
                        <div>
                            <h1 className='font-bold text-[20px]'>{profile?.displayName}</h1>
                        </div>
                    </div>
                </div>

                <div className='w-[85%] space-y-[40px] mt-[30px]'>
                    {
                        myPost?.length ?
                        myPost?.map((i,index) => (
                            <PostCard post={i} key={index} />
                        ))

                        :

                        <div className="w-full toCenter">
                            <h1 className="font-pop font-medium text-[30px]">No post to show 🙁🙁</h1>
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
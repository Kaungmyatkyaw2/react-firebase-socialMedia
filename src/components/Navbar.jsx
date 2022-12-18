import { AiFillHome, AiOutlinePlus } from 'react-icons/ai'
import { BsMenuAppFill, BsMenuButton, BsMessenger, BsSearch } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import {RiGroup2Line} from 'react-icons/ri'
import {IoMdNotifications} from 'react-icons/io'
import {SiFacebookgaming} from 'react-icons/si'
import { MdOndemandVideo } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import logo from '../assets/image/facebook.svg'
import { signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/Auth/AuthSlicer'
import { auth } from '../firebase'
import { toggleLeftSide, toggleUserModal } from '../store/useraction/UserActionSlicer'
import { BiMenu } from 'react-icons/bi'

const Navbar = () => {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.auth.user)

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(setUser(null))
        }).catch(e => console.log(e))
    }

  return (
    <div className='sticky top-0 left-0 w-full bg-white py-[10px] px-[20px] flex justify-between z-[999] border-b-2'>
        <div className='md:w-[25%] flex items-center space-x-[20px]'>
            <img src={logo} className='w-[40px]' alt="" />
            <div className='bg-[#F0F2F5] w-[80%] px-[20px] py-[7px] space-x-[10px] rounded-[40px] md:flex hidden items-center'>
                <BsSearch className='text-gray-500'/>
                <input type="text" className='bg-transparent text-[15px] outline-none' placeholder='Search Facebook' />
            </div>
            <div className='md:hidden block' onClick={() => dispatch(toggleLeftSide())}>
                <BiMenu className='text-[30px]'/>
            </div>
        </div>
        <div className='md:w-[25%] flex justify-end space-x-[10px]'>
            <div className='rounded-btn' onClick={() => dispatch(toggleUserModal())}>
                <AiOutlinePlus className='text-[22px]'/>
            </div>
            <NavLink to={`/main/profile/${userInfo?.id}`} className='rounded-btn relative group'>
            <img className='rounded-btn object-cover' src={userInfo?.photoUrl} alt="" />
            </NavLink>
            <button onClick={handleLogout} className='px-[20px] rounded-[20px] text-white text-[12px] font-bold font-pop bg-primary'>Log Out</button>
        </div>
    </div>
  )
}

export default Navbar
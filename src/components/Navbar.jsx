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
    <div className='sticky top-0 left-0 w-full bg-white py-[10px] px-[20px] flex justify-between z-[999]'>
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
        <div className='md:w-[50%] w-full md:static flex items-center justify-evenly text-gray-500 fixed bottom-0 left-0 bg-white md:py-[0px] py-[10px]'>
            <NavLink to='/main' end><AiFillHome className='text-[25px]'/></NavLink>
            <NavLink to='/no'><FaUserFriends className='text-[25px]'/></NavLink>
            <NavLink to='/no'><MdOndemandVideo className='text-[25px]'/></NavLink>
            <NavLink to='/no'><RiGroup2Line className='text-[25px]'/></NavLink>
            <NavLink to='/no'><SiFacebookgaming className='text-[20px]'/></NavLink>
        </div>
        <div className='md:w-[25%] flex justify-end space-x-[10px]'>
            <div className='rounded-btn' onClick={() => dispatch(toggleUserModal())}>
                <AiOutlinePlus className='text-[22px]'/>
            </div>
            <div className='rounded-btn'>
                <BsMessenger className='' /> 
            </div>
            <div className='rounded-btn'>
                <IoMdNotifications className='text-[21px] rotate-[5deg]' /> 
            </div>
            <NavLink to={`/main/profile/${userInfo.id}`} className='rounded-btn relative group'>
            <img className='rounded-btn object-cover' src={userInfo?.photoUrl} alt="" />
            <ul onClick={handleLogout} className='hidden group-hover:block absolute bottom-0 hover:bg-gray-50 translate-y-[100%] left-[-100%] bg-white text-[15px] shadow-lg px-[20px] py-[10px]'>
                <li>Logout</li>
            </ul>
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar
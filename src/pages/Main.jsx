import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import LeftSidebar from '../components/LeftSidebar'
import Navbar from '../components/Navbar'
import CreatePost from './CreatePost'

const Main = () => {


    return (
    <>
        <Navbar/>
        <div className='flex relative'>
            <LeftSidebar/>
            <Outlet/>
            <CreatePost/>
        </div>
    </>
  )
}

export default Main
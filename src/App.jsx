import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Main from './pages/Main'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login'
import { auth, db } from './firebase'
import { setIsLoadAuth, setUser, setUserId } from './store/Auth/AuthSlicer'
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import Lottie from 'lottie-react'
import loader from './assets/lottie/loading.json'
import Profile from './pages/Profile'
import FourOFour from './pages/FourOFour'

const App = () => {

  const dispatch = useDispatch()
  const id = useSelector(state => state.auth.userId)
  const load = useSelector(state => state.auth.isLoadAuth)
  const nav = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const data = {...user}
        dispatch(setUserId(data.uid));
      }else{
        dispatch(setUserId(null))
      }
    })
  },[])

  useEffect(() => {

    const q = query(collection(db,'users'),where('id','==',id))
    dispatch(setIsLoadAuth(true))

    if (!id) {
      nav('/')
      dispatch(setIsLoadAuth(false))
    }else{
    const unsub = onSnapshot(q,(snap) => {
        snap.docs.forEach(i => dispatch(setUser(i.data())))
        dispatch(setIsLoadAuth(false))
    })
      nav('/main')

    return unsub
    }

    

  },[id])

  if (load) {
    return <div className='h-[100vh] toCenter'>
      <div className='w-[300px]'>
      <Lottie animationData={loader} autoPlay loop />
      </div>
    </div>
  }

  return (
   <>
        <ToastContainer position='top-center' />
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='/main' element={<Main/>}>
            <Route index element={<Home/>} />
            <Route path='profile/:id' element={<Profile/>} />
          </Route>
          <Route path='*' element={<FourOFour/>} />
        </Routes>
   </>
  )
}

export default App
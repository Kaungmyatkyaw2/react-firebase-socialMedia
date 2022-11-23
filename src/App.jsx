import React from 'react'
import {FaUserFriends} from 'react-icons/fa'
import {BsBookmarkFill} from 'react-icons/bs'
import {AiFillFlag} from 'react-icons/ai'
import {BiChevronDown} from 'react-icons/bi'
import {IoPeopleCircleSharp} from 'react-icons/io5'
import {MdOndemandVideo} from 'react-icons/md'

const App = () => {



  const icon  = [
    {
      icon : <FaUserFriends/>,
      title : 'Friends',
      color : "text-[#1773E7]"
    },
    {
      icon : <BsBookmarkFill/>,
      title : 'Saved',
      color : "text-[#8138CE]"
    },
    {
      icon : <AiFillFlag/>,
      title : "Pages",
      color : 'text-[#F0632B]'
    },
    {
      icon : <IoPeopleCircleSharp/>,
      title : "Groups",
      color : 'text-[#21A2EE]'
    },
    {
      icon : <MdOndemandVideo/>,
      title : "Watchs",
      color : 'text-[#3CBDB9]'
    }
  ]

  const shortCut = [
    {
      img : 'https://scontent.frgn7-1.fna.fbcdn.net/v/t39.30808-6/275420466_5191877110836254_2835212271396095589_n.jpg?stp=c25.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=111&ccb=1-7&_nc_sid=ac9ee4&_nc_ohc=iJ1nIdeeiSQAX9ah8JG&_nc_ht=scontent.frgn7-1.fna&oh=00_AfDByigiAZyXPngkTwPYT2qBt6mkcOtABc9wTnXuwUmQ6A&oe=63837062',
      title : 'Darth Vader Prop'
    },
    {
      img : 'https://scontent.frgn7-3.fna.fbcdn.net/v/t39.2081-6/277099262_526479995893026_7962377150707606566_n.jpg?stp=c6.6.31.31a_dst-jpg_p36x36&_nc_cat=1&ccb=1-7&_nc_sid=eaa83b&_nc_ohc=3yxPTg5lAQMAX_qsoDK&_nc_ht=scontent.frgn7-3.fna&oh=00_AfDLtScZO1gLy0AbZ7_Hg5MsyM17rmBFD0QGFFKg4Uptrw&oe=6383D64A',
      title : "Yuzzy Cube"
    },
    {
      img : 'https://scontent.frgn7-3.fna.fbcdn.net/v/t39.30808-6/237953258_634979457478947_349970788547327318_n.jpg?stp=c19.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=108&ccb=1-7&_nc_sid=ac9ee4&_nc_ohc=N1AZLk9m0nIAX8CXluC&_nc_ht=scontent.frgn7-3.fna&oh=00_AfCEgA8b2F14ZL-kNXzepoy-_-8s9H_t9ZTR1C9ybCDa8g&oe=6382C059',
      title : "Myanmar Web Developer"
    }
  ]

  return (
    <div className='w-[25%] h-[100vh] bg-[#F0F2F5]  pt-[30px] pl-[10px]'>
     

     <div className='pl-[10px] border-b border-gray-300 pb-[10px]'>

          <div className='flex items-center space-x-[10px] hover:bg-gray-200 py-[10px] px-[10px] rounded-[5px] cursor-pointer'>
              <img src="https://scontent.frgn7-3.fna.fbcdn.net/v/t39.30808-1/309028348_612947263895538_3289164825885167559_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=103&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=Le4Fg3tqjFIAX-FyfRu&_nc_ht=scontent.frgn7-3.fna&oh=00_AfBjH9HNGqy8V_pNphjvdkIPtWYWpIwYZP0QQTLlDS3iOw&oe=63840BE0" className='rounded-full h-[36px] w-[36px] object-cover' alt="" />
              <p className='text-[14px] tracking-wide'>Kaung Myat Kyaw</p>
            </div>

            {
              icon.map((i,index) => (
                <div key={index} className='flex items-center space-x-[10px] hover:bg-gray-200 py-[10px] px-[10px] rounded-[5px] cursor-pointer'>
                  <div className={`w-[36px] text-[23px] flex justify-center ${i.color}`}>
                  {i.icon}
                  </div>
                  <p className='text-[14px] tracking-wide'>{i.title}</p>
                </div>
              ))
            }

            <div className='flex items-center space-x-[10px] hover:bg-gray-200 py-[10px] px-[10px] rounded-[5px] cursor-pointer'>
              <div className='w-[30px] h-[30px] bg-gray-300 rounded-full flex justify-center items-center'>
                <BiChevronDown className='text-[24px]'/>
              </div>
              <p className='text-[14px] tracking-wide'>See more</p>
            </div>

     </div>

     <div className='pl-[10px] pt-[20px]'>
      <h1 className='font-bold text-gray-500 px-[10px] text-[15px] tracking-wide pb-[10px]'>Your Shortcuts</h1>
      
          {
            shortCut.map((i,index) => (
              <div key={index} className='flex items-center space-x-[10px] hover:bg-gray-200 py-[10px] px-[10px] rounded-[5px] cursor-pointer'>
                <img className='rounded-[5px] h-[36px] w-[36px] object-cover' src={i.img} alt="" />
                <p className='text-[14px] tracking-wide'>{i.title}</p>
              </div>
            ))
          }

            <div className='flex items-center space-x-[10px] hover:bg-gray-200 py-[10px] px-[10px] rounded-[5px] cursor-pointer'>
              <div className='w-[30px] h-[30px] bg-gray-300 rounded-full flex justify-center items-center'>
                <BiChevronDown className='text-[24px]'/>
              </div>
              <p className='text-[14px] tracking-wide'>See more</p>
            </div>


     </div>
   

    </div>
  )
}

export default App
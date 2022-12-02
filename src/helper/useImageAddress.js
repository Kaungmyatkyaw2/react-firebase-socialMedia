import React, { useState } from 'react'

const useImageAddress = () => {

    const [img,setImg] = useState()

    const imageHandler = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImg(e.target.result)
        }
    }

  return [img,imageHandler]
}

export default useImageAddress
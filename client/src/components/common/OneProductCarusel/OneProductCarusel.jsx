import { useEffect, useState } from 'react'
import './oneProductCarusel.scss'
import imgsArr from 'data/imgs'
import { useDispatch, useSelector } from 'react-redux'
import {  setShow } from 'store/popupHandler'
import ProductImgPopup from 'components/specific/ProductImgPopup/ProductImgPopup'

const OneProductCarusel = () => {
  const dispatch=useDispatch()
  const [imgIndex,setImgIndex]=useState(0)
  const screenWidth=useSelector(state=>state.screenSize.screenWidth)
  const [click,setClick]=useState(false)
  useEffect(()=>{
    if(click){
        dispatch(setShow("productImgHidden"))
        setClick(false)
    }
  },[click])
  return (
    <>
    <ProductImgPopup src={imgsArr[imgIndex].src} alt={imgsArr[imgIndex].alt}/>
    <div className='caruselImgs'>
    {screenWidth>600?<img
      src={imgsArr[imgIndex].src}
      alt={imgsArr[imgIndex].alt}
      onClick={()=>{dispatch(setShow("productImgHidden"))}}
      />:imgsArr.map((img,indx)=><img
      onClick={()=>{setClick(true);setImgIndex(indx)}}
    src={img.src}
    alt={img.alt}
  />)}
  </div>

  <div
    id='indecator'
    className='indecator'>
    {imgsArr.map((img,indx)=><div onClick={()=>setImgIndex(indx)} className={`dots ${imgIndex==indx?"active":""}`}></div>)}
  </div>
    </>
  )
}

export default OneProductCarusel
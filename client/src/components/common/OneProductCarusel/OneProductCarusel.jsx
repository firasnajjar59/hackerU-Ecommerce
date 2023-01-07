import { useEffect, useState } from 'react'
import './oneProductCarusel.scss'
// import imgsArr from 'data/imgs'
import { useDispatch, useSelector } from 'react-redux'
import {  setShow } from 'store/popupHandler'
import ProductImgPopup from 'components/specific/ProductImgPopup/ProductImgPopup'

const OneProductCarusel = (props) => {
  let [imgsArr,setImgsArr]=useState([])
  const dispatch=useDispatch()
  const [imgIndex,setImgIndex]=useState(0)
  const screenWidth=useSelector(state=>state.screenSize.screenWidth)
  const [click,setClick]=useState(false)
  useEffect(()=>{
    setImgsArr(props.imgs)
  },[])
  useEffect(()=>{
    if(click){
        dispatch(setShow("productImgHidden"))
        setClick(false)
    }

  },[click])
  return (
    <>
    <ProductImgPopup src={imgsArr[imgIndex]} alt="hi"/>
    <div className='caruselImgs'>
    {screenWidth>600?<img
      src={imgsArr[imgIndex]}
      alt={imgsArr[imgIndex]}
      onClick={()=>{dispatch(setShow("productImgHidden"))}}
      />:imgsArr.map((img,indx)=><img key={indx}
      onClick={()=>{setClick(true);setImgIndex(indx)}}
    src={img}
    alt={img}
  />)}
  </div>

  <div
    id='indecator'
    className='indecator'>
    {imgsArr.map((img,indx)=><div key={indx} onClick={()=>setImgIndex(indx)} className={`dots ${imgIndex==indx?"active":""}`}></div>)}
  </div>
    </>
  )
}

export default OneProductCarusel
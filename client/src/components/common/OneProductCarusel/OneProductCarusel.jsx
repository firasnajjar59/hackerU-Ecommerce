import { useEffect, useState } from 'react'
import './oneProductCarusel.scss'
// import imgsArr from 'data/imgs'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const OneProductCarusel = (props) => {
  let [imgsArr,setImgsArr]=useState([])
  const [imgIndex,setImgIndex]=useState(0)
  const screenWidth=useSelector(state=>state.screenSize.screenWidth)
  const history=useHistory()
  useEffect(()=>{
    setImgsArr(props.imgs)
  },[])
 

  const openImgPopup=(imgUrl)=>()=>{
    history.push({pathname:`/imgs/${props._id}`,state:{imgUrl}})
  }
  return (
    <>
    <div className='caruselImgs'>
    {screenWidth>600?<img
      src={imgsArr.length>0&&imgsArr[imgIndex].startsWith("http")?imgsArr[imgIndex]:`${process.env.REACT_APP_SERVER_URL}/images/products/${imgsArr[imgIndex]}`}
      alt={imgsArr[imgIndex]}
      onClick={openImgPopup(imgsArr[imgIndex])}
      />:imgsArr.map((img,indx)=><img key={indx}
      onClick={openImgPopup(img)}
    src={img.startsWith("http")?img:`${process.env.REACT_APP_SERVER_URL}/images/products/${img}`}
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
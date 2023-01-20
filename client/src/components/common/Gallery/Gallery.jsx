import { useEffect, useState } from "react"
import "./Gallery.scss"
import axios from "axios"
const Gallery = (props) => {
  const [imgs,setImgs]=useState([])
  useEffect(()=>{
    (async()=>{
      try {
        const {data}=await axios.get('/v1/gallary')
        setImgs(data.data.doc)
      } catch (error) {
        console.log(error);
      }
    })()
  },[])
 useEffect(()=>{
  console.log(imgs);
 },[imgs])
  return (
    <div className="gallery">
      {imgs.length>0&&imgs.map((img,indx)=>{
      let classes="";
      let rnd=Math.floor(Math.random() * (4 - 1) ) + 1
      console.log(rnd);
        classes=rnd==1?"":rnd==2?"v-stretch":rnd==3?"h-stretch":"big-stretch"
      return <div key={indx} className={classes}><div className="caption">{img.caption}</div><img src={`${process.env.REACT_APP_SERVER_URL}/images/gallary/${img.img}`} alt={img.alt} /></div>
      })}
    </div>
  )
}

export default Gallery
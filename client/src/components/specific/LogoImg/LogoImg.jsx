import { useSelector } from "react-redux"
import "./logoImg.scss"
import { useEffect, useState } from "react"
import axios from "axios"





const LogoImg = (props) => {
  const theme=useSelector(state=>state.theme.theme)
  const imgs=useSelector(state=>state.logo)

  return (
    <div className="logoWrapper">
    <img className=""
     src={theme=="theme-dark"?`${process.env.REACT_APP_SERVER_URL}/images/content/${imgs.dark}`:`${process.env.REACT_APP_SERVER_URL}/images/content/${imgs.light}`} 
     alt="" />
  </div>
  )
}

export default LogoImg
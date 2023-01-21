import { useSelector } from 'react-redux'
import './loadingAnimate.scss'

import React from 'react'

const LoadingAnimate = (props) => {
  const imgs=useSelector(state=>state.logo)
  const theme=useSelector(state=>state.theme.theme)

  return (
    <>
    <div className={`loading-over-lay ${props.classes}`}></div>
    <img className={`loading-img ${props.imgClasses}`} src={theme=="theme-dark"?`${process.env.REACT_APP_SERVER_URL}/images/content/${imgs.light}`:`${process.env.REACT_APP_SERVER_URL}/images/content/${imgs.dark}`} alt="" />
    </>
  )
}

export default LoadingAnimate
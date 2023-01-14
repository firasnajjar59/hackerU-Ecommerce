import './loadingAnimate.scss'

import React from 'react'

const LoadingAnimate = (props) => {
  return (
    <>
    <div className={`loading-over-lay ${props.classes}`}></div>
    <img className={`loading-img ${props.imgClasses}`} src={`${process.env.REACT_APP_SERVER_URL}/images/logo/White on Transparent.png`} alt="" />
    </>
  )
}

export default LoadingAnimate
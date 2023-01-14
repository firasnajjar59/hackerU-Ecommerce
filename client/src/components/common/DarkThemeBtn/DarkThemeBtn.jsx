import { useEffect, useRef } from 'react'
import './darkThemeBtn.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from 'store/theme'

const DarkThemeBtn = (props) => {
    const theme=useSelector(state=>state.theme.theme)
    const dispatch=useDispatch()
    const innerBtnRef=useRef()
  const handleThemeBtn=()=>{
    dispatch(setTheme(theme=='theme-dark'?'theme-light':'theme-dark'))
  }
  useEffect(()=>{
    if(localStorage.getItem("theme")){
        dispatch(setTheme(localStorage.getItem("theme")))
      }
    },[])
    useEffect(()=>{
        localStorage.setItem("theme",theme)
        const innerBtn=innerBtnRef.current
        document.querySelector('html').dataset.theme=theme
        theme=='theme-dark'?innerBtn.style.justifyContent="end":innerBtn.style.justifyContent="start"
    },[theme])
  return (
    <div className={`theme-wrapper ${props.classes}`}>
        <div onClick={()=>{dispatch(setTheme(theme=='theme-dark'?'theme-light':'theme-dark'))}} className='theme-btn' ref={innerBtnRef}>
          <div  className='theme-btn-inner' ></div>
        </div>
      </div>
  )
}

export default DarkThemeBtn
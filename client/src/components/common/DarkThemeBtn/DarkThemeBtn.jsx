import { useEffect, useRef } from 'react'
import './darkThemeBtn.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from 'store/theme'

const DarkThemeBtn = (props) => {
    const theme=useSelector(state=>state.theme.theme)
    const dispatch=useDispatch()
    const innerBtnRef=useRef()

    useEffect(()=>{
    },[])
    useEffect(()=>{
        const innerBtn=innerBtnRef.current
        document.querySelector('html').dataset.theme=theme
        theme=='theme-dark'?innerBtn.style.justifyContent="end":innerBtn.style.justifyContent="start"
        console.log(theme);
    },[theme])
  return (
    <div className={`theme-wrapper ${props.classes}`}>
        <div className='theme-btn' ref={innerBtnRef}>
          <div onClick={()=>{dispatch(setTheme(theme=='theme-dark'?'theme-light':'theme-dark'))}} className='theme-btn-inner' ></div>
        </div>
      </div>
  )
}

export default DarkThemeBtn
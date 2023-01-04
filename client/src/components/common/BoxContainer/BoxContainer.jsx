import { useEffect, useRef } from "react";
import "./boxContainer.scss";
const SideSortComponent = (props) => {
  const borderColor = useRef()
  useEffect(()=>{
    if(props.color){
      borderColor.current.style.borderColor=props.color
    }
  },[])
  return (
    <div className="right" ref={borderColor}>
    <div className="filter-Wrapper">
    {props.title && <><h2 className="title">{props.title}</h2>
    <hr/></>}
    {props.children}
    </div>
    </div>
  )
}

export default SideSortComponent
import { useState } from 'react'
import './expandSection.scss'
import MaterialIcon from '../MaterialIcon/MaterialIcon'


const ExpandSection = (props) => {
    const [displayMenu,setDisplayMenu]=useState(false)

    const handleInnerMenuSmallScreen=()=>{
        setDisplayMenu(displayMenu?false:true)
      }

  return (
    <>
    <div onClick={handleInnerMenuSmallScreen} className="expand-section-title-wrapper">
        <h5>{props.title}</h5>
        <MaterialIcon onclick={handleInnerMenuSmallScreen} title={displayMenu?"expand_less":"expand_more"} />

      </div>
        {displayMenu&&props.children}
    </>
  )
}

export default ExpandSection
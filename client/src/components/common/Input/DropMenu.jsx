import React from 'react'

const DropMenu = (props) => {
  
  return (  
    <select data-label={props.datalabel} value={props.value} onChange={props.onchange} className={`form-select ${props.classes}`} id={props.id}>
      {props.options?props.options.map((item,indx)=><option key={indx}>{item}</option>):null}
    </select>
  )
}

export default DropMenu
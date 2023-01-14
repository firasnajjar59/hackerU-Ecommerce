import Input from 'components/common/Input/Input'
import './selectOption.scss'
import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon'
import { useEffect, useState } from 'react'
import Button from 'components/common/Button/Button'


const MultiOption = (props) => {
    const arrayOption=props.arrayOption||false
    const [option,SetOption]=useState([])

    useEffect(()=>{
        if(props.defaultOptions){
            SetOption(props.defaultOptions)
        }
    },[props.defaultOptions])
    const deleteOneOption=(indx)=>()=>{
        SetOption(prev=>{
            prev.splice(indx,1)
            return [...prev]
        })
    }
    const addOneOption=()=>{

        SetOption(prev=>{
            prev.push({name:"",option:""})
            return [...prev]
        })
    }
    const handleOnChange=(indx)=>(ev)=>{
        SetOption(prev=>{
            let options=ev.target.value
            if(arrayOption&&ev.target.dataset.label=="option"){
                options=options.split(",")
            }
            prev[indx][ev.target.dataset.label]=options
            return [...prev]
        })
    }
  const sendArrToParentComponent=()=>{
    props.onapply(option)
  }
  return (
    <>
    <h5>{props.title}</h5>
    {option.length>0&&option.map((el,indx)=><div key={indx} className="option-wrapper">
        <div className='option-title'>
        <label htmlFor="name">{props.firstInpLabel}</label>
        <Input datalabel="name" onchange={handleOnChange(indx)} placeholder={props.firstPlaceholder} value={el.name} />
        </div>
        <div className='option-option'>
        <label htmlFor="option">{props.secondInpLabel}</label>
        <Input datalabel="option" onchange={handleOnChange(indx)} placeholder={props.secondPlaceholder} value={el.option} />
        </div>
        <div className="option-minus-button">
            <MaterialIcon onclick={deleteOneOption(indx)} title="delete"/>
        </div>
    </div>)}
    <div onClick={addOneOption} className="add-option">
        <MaterialIcon title="add_box" />
    </div>
        <Button onclick={sendArrToParentComponent} classes={option.length>0?"primary-button":"disabled-button"}>Apply changes</Button>
    </>
  )
}

export default MultiOption
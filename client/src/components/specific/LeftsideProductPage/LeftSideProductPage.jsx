/** @format */

import Button from 'components/common/Button/Button';
import './leftSideProductPage.scss';
import TextArea from 'components/common/Input/TextArea';
import BoxContainer from '../../common/BoxContainer/BoxContainer';
import { useEffect, useState } from 'react';
import updateInputs from 'functions/updateInputs';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
import { addArrProductToCart } from 'store/cart';
import { resetMessage, setMessage } from 'store/toast';
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler';

const LeftsideProductPage = (props) => {
  const updateUser=useUpdateUserRedux()
  const dispatch=useDispatch()
  const loggedIn=useSelector(state=>state.loggedIn.loggedIn)
  const cart=useSelector(state=>state.cart.cart)
  const [inputs,setInputs]=useState({
    selectOption:[],
    price:"",
    quantity:1,
    product_id:"",
    note:""
  })
  useEffect(()=>{
    setInputs(prev=>{
      prev.product_id=props.id
      prev.price=props.product.price
      prev.selectOption=[]
      props.selectOption.length>0&&props.selectOption.map(el=>prev.selectOption.push({name:el.name,option:""}))
      return {
        ...prev
      }
    })
  },[])

// 
const handleInputs = ev => updateInputs(ev, setInputs);
// 
const ofwoodErrorhandler=useOfwoodErrorhandler()
  const handleSelect=(indx)=>(ev)=>{ 
    setInputs(prev=>{
    prev.selectOption[indx].option=ev.target.value
    return {
      ...prev
    }
  })}
  const handleAddToCart=async()=>{
    if(loggedIn){
      try {
        let cartArr=cart.filter(product=>product.product_id==inputs.product_id)
        if(cartArr.length==0){
          let cartArr=JSON.parse(JSON.stringify(cart))
          cartArr.push(inputs)
          let { data } = await axios.patch('/v1/users/updateme', {cart:cartArr});
          updateUser(data.data.token)
          dispatch(setMessage("The product added to your cart"))
                setTimeout(()=>{
                  dispatch(resetMessage())
                },5000)
      }} catch (error) {
        ofwoodErrorhandler(error.respone.data)
      }
    }else{
      let cartArr=[]
      if(localStorage.getItem("cart")){
        cartArr=JSON.parse(localStorage.getItem("cart"))
      }
      let filterdArr=cartArr.filter(product=>product.product_id==inputs.product_id)
      if(!filterdArr.length>0){
        cartArr.push(inputs);
        localStorage.setItem("cart",JSON.stringify(cartArr))
        dispatch(addArrProductToCart(cartArr))
      }
    }
  }
  return (
    <div className={`leftAside ${props.classes}`}>
      <BoxContainer>
        {inputs.selectOption.length>0&&props.selectOption.map((select,indx)=>
        <div key={indx} className='custWrapper'>
          <p>{select.name}</p>
          <select
            name='custmize'
            id='custmizeSelection' onChange={handleSelect(indx)} value={inputs.selectOption[indx].option}>
              <option defaultValue="">Choose {select.name}</option>
            {select.option.map((option,indx)=><option key={indx} value={option}>{option}</option>)}
          </select>
        </div>)}
        <div className='textareaCust'>
          <p>Notes</p>
          
            <TextArea datalabel="note" onchange={handleInputs} value={inputs.note} placeholder="Add note" id="custumizeText" />
        </div>
      </BoxContainer>
      <BoxContainer>
        <div className='counterWrapper'>
          <p>Quantity</p>
          <input
            type='number'
            name=''
            id=''
            data-label="quantity"
            onChange={handleInputs}
            value={inputs.quantity}
          />
        </div>
        <p className='price'>{props.product.price} $</p>
        <Button onclick={handleAddToCart} classes='primary-button'>Add To Cart</Button>
      </BoxContainer>
    </div>
  );
};

export default LeftsideProductPage;

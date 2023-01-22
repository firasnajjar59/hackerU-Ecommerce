/** @format */

import { useHistory, useParams } from 'react-router-dom';
import './placeOrder.scss';
import { useEffect } from 'react';
import axios from 'axios';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
import { useDispatch } from 'react-redux';
import { resetMessage, setMessage } from 'store/toast';

const PlaceOrder = () => {
    const dispatch=useDispatch()
    const history=useHistory()
    const updateUser=useUpdateUserRedux()
    const {ordertoken}=useParams()
    console.log(ordertoken);
    useEffect(()=>{
        (async()=>{
            try {
                const {data}=await axios.get(`/v1/order/placeorder/${ordertoken}`)
                dispatch(setMessage("Your order placed. Thank you for shopping with us."))
                setTimeout(()=>{
                  dispatch(resetMessage())
                },2000)
                updateUser(data.data.token)
                setTimeout(()=>{
                  history.push("/profile/myorders")
                },3000)
           
            } catch (error) {
                console.log(error);
                dispatch(setMessage("Somthing went wrong while placing your order. please contact us"))
                setTimeout(()=>{
                  dispatch(resetMessage())
                },5000)
            }
        })()
    },[])
  return (
    <>
      <div className='row mt-5'>
        <div className='col d-flex justify-content-center color-primary-ofwood'>
          <h3>Processing your order</h3>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col d-flex justify-content-center gap-3'>
          <div
            className='spinner-grow bg-primary-ofwood'
            style={{ width: '3rem', height: '3rem' }}
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <div
            className='spinner-grow bg-primary-ofwood'
            style={{ width: '3rem', height: '3rem' }}
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <div
            className='spinner-grow bg-primary-ofwood'
            style={{ width: '3rem', height: '3rem' }}
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;

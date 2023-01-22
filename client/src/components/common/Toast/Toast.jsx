/** @format */

import { useDispatch, useSelector } from 'react-redux';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import './toast.scss';
import { useEffect } from 'react';
import { resetMessage } from 'store/toast';

const Toast = props => {
    const dispatch=useDispatch()
    const message=useSelector(state=>state.message.message)
    useEffect(()=>{
        console.log(message);
    },[message])
    const handleCloseToast=()=>{
        dispatch(resetMessage())
    }
  return (
    <div className={`toast-ofwood fade ${message.length>0?"show":"hide"}`}>
        <div className='toast-ofwood-wrapper'>
          <div onClick={handleCloseToast} className='toast-ofwood-body'>{message}</div>
          <MaterialIcon title="close" onclick={handleCloseToast} classes="color-secondary-ofwood"/>
        </div>
    </div>
  );
};
{
  /* <div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded me-2" alt="...">
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div> */
}
export default Toast;

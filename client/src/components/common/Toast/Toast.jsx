/** @format */

import { useDispatch, useSelector } from 'react-redux';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import './toast.scss';
import { resetMessage } from 'store/toast';

const Toast = () => {
    const dispatch=useDispatch()
    const message=useSelector(state=>state.message.message)
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

export default Toast;

import PopUp from 'components/common/PopUp/PopUp'
import './productImgPopup.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setHidden } from 'store/popupHandler'

const ProductImgPopup = (props) => {
    const productImgHidden=useSelector(state=>state.popupHandler.productImgHidden)
    const dispatch=useDispatch()
    
  return (
    <PopUp onclick={()=>{dispatch(setHidden("productImgHidden"))}} popupClasses="popup" classes={`${productImgHidden?"hidden":""}`}>
        <img className='Product-img-popup-img' src={props.src} alt={props.alt}/>
    </PopUp>
  )
}

export default ProductImgPopup
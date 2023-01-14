import PopUp from 'components/common/PopUp/PopUp'
import './productImgPopup.scss'

const ProductImgPopup = (props) => {
  const {location}=props

  return (
    <PopUp popupClasses="popup">
        <img className='Product-img-popup-img' src={location.state.imgUrl.startsWith("http")?location.state.imgUrl:`${process.env.REACT_APP_SERVER_URL}/images/products/${location.state.imgUrl}`} alt={props.alt}/>
    </PopUp>
  )
}

export default ProductImgPopup
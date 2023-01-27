import Ribbon from '../Ribbon/Ribbon'
import './popularCard.scss'

const PopularCard = (props) => {

  return (
    <div className="popular-card-wrapper">
        <Ribbon classes="new">{`${props.totalInWishlist} ${props.ribbontitle}`}</Ribbon>
    <img
      src={props.img&&props.img.startsWith("http")?props.img:`${process.env.REACT_APP_SERVER_URL}/images/products/${props.img}`}
      alt='s'
      />
    <div className='deatils'>
      <h5 className='m-2'>{props.title?props.title:"hi"}</h5>
    </div>
      </div>
  )
}

export default PopularCard
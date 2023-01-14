/** @format */

import { useHistory } from 'react-router-dom';
import './card.scss';
import Button from 'components/common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from 'store/cart';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import Box from '../Box/Box';
import { addProductToWishlist } from 'store/wishlist';
const Card = props => {
  const dispatch=useDispatch()
  // forword page
  const history = useHistory();
  const handleClickedProduct = () => {
    history.push({pathname:`/products/${props.slug}`,state:{id:props._id}});
  };
  const handleAddToCart=()=>{
    dispatch(addProductToCart(props._id))
    let cartArr=[]
    if(localStorage.getItem("cart")){
      cartArr=JSON.parse(localStorage.getItem("cart"))
    }
    let filterdArr=cartArr.filter(product=>product==props._id)
    if(!filterdArr.length>0){
      cartArr.push(props._id);
      localStorage.setItem("cart",JSON.stringify(cartArr))
    }
  }
  const handleAddToWishlist=()=>{
    dispatch(addProductToWishlist(props._id))
    let wishlistArr=[]
    if(localStorage.getItem("wishlist")){
      wishlistArr=JSON.parse(localStorage.getItem("wishlist"))
    }
    let filterdArr=wishlistArr.filter(product=>product==props._id)
    if(!filterdArr.length>0){
      wishlistArr.push(props._id);
      localStorage.setItem("wishlist",JSON.stringify(wishlistArr))
    }
  }
  return (
    <div className='caruselCardWrapper'>
      <Box onclick={handleAddToWishlist} classes="bg-secondary-ofwood wishlist-icon">
      <MaterialIcon classes="" title="favorite"/>
      </Box>
      {props.children}
      <img
        onClick={handleClickedProduct}
        src={props.img&&props.img.startsWith("http")?props.img:`${process.env.REACT_APP_SERVER_URL}/images/products/${props.img}`}
        alt='s'
      />
      <div className='deatils'>
        <h3 className='m-2'>{props.title?props.title:"hi"}</h3>
        <p className='m-2'>{props.desc?<>{props.desc.substring(0,30)} ... <br></br><b onClick={handleClickedProduct}>read more...</b></>:""}</p>
        <Button onclick={handleAddToCart} classes='primary-button card-btn'>Add to cart</Button>
      </div>
    </div>
  );
};

export default Card;

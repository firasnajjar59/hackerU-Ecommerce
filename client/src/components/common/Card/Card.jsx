/** @format */

import { useHistory } from 'react-router-dom';
import './card.scss';
import Button from 'components/common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcon from '../MaterialIcon/MaterialIcon';
import Box from '../Box/Box';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';
import axios from 'axios';
import { addArrProductToWishlist } from 'store/wishlist';
import { resetMessage, setMessage } from 'store/toast';
import useOfwoodErrorhandler from '../Errors/errorhandler';
const Card = props => {
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const loggedIn=useSelector(state=>state.loggedIn.loggedIn)
  const wishlist=useSelector(state=>state.wishlist.wishlist)
  const updateUser=useUpdateUserRedux()
  const dispatch=useDispatch()
  // forword page
  const history = useHistory();
  const handleClickedProduct = () => {
    history.push({pathname:`/products/${props.slug}/${props._id}`});
  };
  // 
  const handleAddToWishlist=()=>{
    if(loggedIn){
      (async()=>{
        try {
          let wishlistArr=wishlist.filter(product=>product.id==props._id)
          if(wishlistArr.length==0){
            let wishlistArr=JSON.parse(JSON.stringify(wishlist))
            wishlistArr=wishlistArr.map(product=>product.id)
            wishlistArr.push(props._id)
            let { data } = await axios.patch('/v1/users/updateme', {wishlist:wishlistArr});
            updateUser(data.data.token)
            dispatch(setMessage("Added to your wishlist"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
          }
        } catch (error) {
          ofwoodErrorhandler(error.response.data)
        }
      }
      )()
    }else{
      let wishlistArr=[]
      if(localStorage.getItem("wishlist")){
        wishlistArr=JSON.parse(localStorage.getItem("wishlist"))
      }
      let filterdArr=wishlistArr.filter(product=>product==props._id)
      if(!filterdArr.length>0){
        wishlistArr.push(props._id);
        localStorage.setItem("wishlist",JSON.stringify(wishlistArr))
        dispatch(addArrProductToWishlist(wishlistArr))
        dispatch(setMessage("Added to your wishlist"))
        setTimeout(()=>{
          dispatch(resetMessage())
        },2000)
      }
    }
  }
  return (
    <div className='caruselCardWrapper'>
      
      <Box onclick={handleAddToWishlist} classes="bg-secondary-ofwood wishlist-icon">
      <MaterialIcon classes="" title="favorite"/>
      </Box>
      {props.children}
      <img
        src={props.img&&props.img.startsWith("http")?props.img:`${process.env.REACT_APP_SERVER_URL}/images/products/${props.img}`}
        alt='s'
      />
      <div className='deatils'>
        <h3 className='m-2'>{props.title?props.title:"hi"}</h3>
        <p className='m-2'>{props.desc?<>{props.desc.substring(0,30)} ... <br></br><b onClick={handleClickedProduct}>read more...</b></>:""}</p>
        <Button onclick={handleClickedProduct} classes='primary-button card-btn'>More info</Button>
      </div>
    </div>
  );
};

export default Card;

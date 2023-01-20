import { useEffect, useState } from 'react';
import './wishlist.scss'
import BoxContainer from 'components/common/BoxContainer/BoxContainer';
import Button from 'components/common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Box from 'components/common/Box/Box';
import { addArrProductToWishlist } from 'store/wishlist';
import useUpdateUserRedux from 'hooks/useUpdateUserRedux';


const Wishlist = props => {
    document.title = `Wishlist | ofwood`;
    const dispatch=useDispatch()
    const wishlist=useSelector(state=>state.wishlist.wishlist)
    const loggedIn=useSelector(state=>state.loggedIn.loggedIn)
    const [wishlistProducts,setwishlistProduct]=useState([])
    const updateUser=useUpdateUserRedux()

   
    useEffect(()=>{
      if(!loggedIn&&wishlist.length>0){
        (async ()=>{
          try {
            const {data}=await axios.post("/v1/products/cart",{_id:wishlist})
              setwishlistProduct(data.data.doc)
            } catch (error) {
              console.log(error);
            }
          }
          )()
      }else{
        setwishlistProduct(wishlist)
      }
    },[])
    // 
    useEffect(()=>{
      if(loggedIn){
        setwishlistProduct(wishlist)
      }
    },[wishlist])

   const handleDeleteProduct=(indx)=>()=>{
    if(loggedIn){
      (async()=>{
        try {
            let wishlistArr=JSON.parse(JSON.stringify(wishlist))
            wishlistArr.splice(indx,1)
            wishlistArr=wishlistArr.map(product=>product.id)
            let { data } = await axios.patch('/v1/users/updateme', {wishlist:wishlistArr});
            updateUser(data.data.token)
        } catch (error) {
          console.log(error);
        }
      }
      )()
    }else{
      let wishlistLocal=JSON.parse(localStorage.getItem('wishlist'))
      wishlistLocal.splice(indx,1)
      localStorage.setItem('wishlist',JSON.stringify(wishlistLocal))
      dispatch(addArrProductToWishlist(wishlistLocal))
      setwishlistProduct(prev=>{
        prev.splice(indx,1)
        return [
          ...prev
        ]
      })
    }
   }
  return (
    <div className='container m-auto'>
    <h1>Wishlist</h1>
   {wishlistProducts.length>0?<div className={`cart-wrapper`}>
      <div className='cart-products-list-wrapper'>
        {wishlistProducts.map((product,indx)=><BoxContainer key={indx}>
          <div className='cart-product-list-wrapper'>
            <div className='product-list-img-wrapper'>
              <img
                src={product?.imgs[0].length>0&&product.imgs[0].startsWith("http")?product.imgs[0]:`${process.env.REACT_APP_SERVER_URL}/images/products/${product.imgs[0]}`}
                alt=''
                onClick={()=>console.log(`${process.env.REACT_APP_SERVER_URL}/images/products/${product.imgs[0]}`)}
              />
            </div>
            <div className='product-list-details-wrapper'>
              <h3 className='product-details-title'>
                {product.name}
              </h3>
              <p>Qty: 100</p>
              <p>Price: {product.price}$</p>
              <Button onclick={handleDeleteProduct(indx)} classes="danger-button grid-button">Remove</Button>
            </div>
          </div>
        </BoxContainer>)}
      </div>
    </div>:<Box classes="bg-secondary-ofwood"><div className='no-product-wrapper '><h5>No products in your wishlist</h5></div></Box>
      }
  </div>

  )
}

export default Wishlist
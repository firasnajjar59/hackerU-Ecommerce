import { useEffect, useState } from 'react';
import './wishlist.scss'
import BoxContainer from 'components/common/BoxContainer/BoxContainer';
import Button from 'components/common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Box from 'components/common/Box/Box';
import { removeProuctFromWishlist } from 'store/wishlist';


const Wishlist = props => {
    document.title = `Cart | ofwood`;
    const dispatch=useDispatch()
    const wishlist=useSelector(state=>state.wishlist.wishlist)
    const [wishlistProducts,setwishlistProduct]=useState([])
   
    useEffect(()=>{
      if(wishlist.length>0){
        (async ()=>{
          try {
            const {data}=await axios.post("/v1/products/cart",{_id:wishlist})
            setwishlistProduct(data.data.doc)
          } catch (error) {
            console.log(error);
          }
        }
        )()
      }
    },[])

   const handleDeleteProduct=(indx)=>()=>{
    setwishlistProduct(prev=>{
      prev.splice(indx,1)
      return[
        ...prev
      ]
    })
    dispatch(removeProuctFromWishlist(indx))
    let wishlistLocal=JSON.parse(localStorage.getItem('wishlist'))
    wishlistLocal.splice(indx,1)
    console.log(wishlistLocal);
    localStorage.setItem('wishlist',JSON.stringify(wishlistLocal))
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
                src={product.imgs[0]&&product.imgs[0].startsWith("http")?product.imgs[0]:`${process.env.REACT_APP_SERVER_URL}/images/products/${product.imgs[0]}`}
                alt=''
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
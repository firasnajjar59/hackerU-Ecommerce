/** @format */

import { useParams } from 'react-router-dom';
import './productPage.scss';
import LeftsideProductPage from 'components/specific/LeftsideProductPage/LeftSideProductPage';
import RightSideProductPage from 'components/specific/RightSideProductPage/RightSideProductPage';
import OneProductCarusel from 'components/common/OneProductCarusel/OneProductCarusel';
import { useEffect, useState } from 'react';
import axios from 'axios';
const ProductPage = () => {
  const [product,setProudact]=useState()
  const [reviews,setReviews]=useState()
  const { productId } = useParams();
  document.title = `product | ${productId}`;
  useEffect(()=>{
    (
      async ()=>{
        try {
          let {data:products}=await axios.get(`/v1/products/${productId}`)
          let {data:reviews}=await axios.get(`/v1/products/product/${productId}/reviews`)
          setProudact(products.doc)
          setReviews(reviews.doc)
        } catch (error) {
          console.log(error);
        }
      }
    )()
  },[])
  return (
    <div className='container oneProductCaruselWrapper '>
     {product&&<> <div className="title-wrapper">
      <h1>{product.name}</h1>
      </div>
      <OneProductCarusel imgs={product.imgs} />
      <div className='descriptionWrapper'>
        <LeftsideProductPage />
        <RightSideProductPage reviews={reviews} description={product.description} />
      </div></>}
    </div>
  );
};

export default ProductPage;

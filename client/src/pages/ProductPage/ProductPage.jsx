/** @format */

import { useParams } from 'react-router-dom';
import './productPage.scss';
import LeftsideProductPage from 'components/specific/LeftsideProductPage/LeftSideProductPage';
import RightSideProductPage from 'components/specific/RightSideProductPage/RightSideProductPage';
import OneProductCarusel from 'components/common/OneProductCarusel/OneProductCarusel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler';
const ProductPage = (props) => {
  const ofwoodErrorhandler=useOfwoodErrorhandler()
  const {slug,id}=useParams()
  const [product,setProudact]=useState()
  const [reviews,setReviews]=useState()
  document.title = `Product | ${slug.split("-").join(" ").toUpperCase()}`;
  useEffect(()=>{
    (
      async ()=>{
        try {
          let {data:products}=await axios.get(`/v1/products/${id}`)
          let {data:reviews}=await axios.get(`/v1/products/product/${id}/reviews`)
          setProudact(products.doc)
          setReviews(reviews.doc)
        } catch (error) {
          ofwoodErrorhandler(error.response.data)
        }
      }
    )()
  },[])
  const handLocalReview=(reviews)=>{
    setReviews(reviews)
  }
  return (
    <div className='container oneProductCaruselWrapper '>
     {product&&<> <div className="title-wrapper">
      <h1>{product.name}</h1>
      </div>
      <OneProductCarusel imgs={product.imgs} _id={id} />
      <div className='descriptionWrapper'>
        <LeftsideProductPage id={id} selectOption={product.selectOption} classes="descriptionWrapper-left" product={product} />
        <RightSideProductPage properties={product.properties} classes="descriptionWrapper-right" reviews={reviews} id={id} onAddReview={handLocalReview} description={product.description} />
      </div></>}
    </div>
  );
};

export default ProductPage;

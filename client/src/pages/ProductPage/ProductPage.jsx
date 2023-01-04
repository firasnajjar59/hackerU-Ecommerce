/** @format */

import { useParams } from 'react-router-dom';
import './productPage.scss';
import LeftsideProductPage from 'components/specific/LeftsideProductPage/LeftSideProductPage';
import RightSideProductPage from 'components/specific/RightSideProductPage/RightSideProductPage';
import OneProductCarusel from 'components/common/OneProductCarusel/OneProductCarusel';
const ProductPage = () => {
  const { productId } = useParams();
  console.log(productId);
  document.title = `product | ${productId}`;
  return (
    <div className='container oneProductCaruselWrapper '>
      <div className="title-wrapper">
      <h1>hi1</h1>
      </div>
      <OneProductCarusel />
      <div className='descriptionWrapper'>
        <LeftsideProductPage />
        <RightSideProductPage />
      </div>
    </div>
  );
};

export default ProductPage;

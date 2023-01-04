/** @format */

import { useHistory } from 'react-router-dom';
import './card.scss';
import Button from 'components/common/Button/Button';
const Card = props => {
  // forword page
  const history = useHistory();
  const handleClickedProduct = () => {
    history.push('/products/productId');
  };
  return (
    <div className='caruselCardWrapper'>
      {props.children}
      <img
        onClick={handleClickedProduct}
        src='../zahi_v1_2022-Mar-10_10-44-17AM-000_CustomizedView3183948036.png'
        alt='s'
      />
      <div className='deatils'>
        <h3 className='m-2'>{props.title?props.title:"hi"}</h3>
        <p className='m-2'>{props.desc?props.desc:"sadflsdaflsadds"}</p>
        <Button classes='primary-button'>Add to cart</Button>
      </div>
    </div>
  );
};

export default Card;

/** @format */

import { useHistory } from 'react-router-dom';
import './card.scss';
import Button from 'components/common/Button/Button';
const Card = props => {
  // forword page
  const history = useHistory();
  const handleClickedProduct = () => {
    history.push(`/products/${props.slug}/${props._id}`);
  };
  return (
    <div className='caruselCardWrapper'>
      {props.children}
      <img
        onClick={handleClickedProduct}
        src={props.img}
        alt='s'
      />
      <div className='deatils'>
        <h3 className='m-2'>{props.title?props.title:"hi"}</h3>
        <p className='m-2'>{props.desc?<>{props.desc.substring(0,40)} <br></br><b onClick={handleClickedProduct}>read more...</b></>:""}</p>
        <Button classes='primary-button card-btn'>Add to cart</Button>
      </div>
    </div>
  );
};

export default Card;

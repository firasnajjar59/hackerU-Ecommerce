/** @format */

import Button from '../Button/Button';
import './placeholderCard.scss';

const PlaceholderCard = () => {
  return (
    <div aria-hidden='true' className='caruselCardWrapper'>
   <svg
        className='bd-placeholder-img card-img-top'
        width='100%'
        height='180'
        xmlns='http://www.w3.org/2000/svg'
        role='img'
        aria-label='Placeholder'
        preserveAspectRatio='xMidYMid slice'
        focusable='false'>
        <title>Placeholder</title>
      </svg>
    <div className='deatils placeholder-details'>
    <h5 className='card-title placeholder-glow'>
          <span className='placeholder'></span>
    </h5>
      <p className='placeholder-glow'><span className='placeholder'></span></p>
      <p className='placeholder-glow'><span className='placeholder'></span></p>
      <Button classes='primary-button placeholder-glow'><span className='placeholder p-3 col-12'></span></Button>
    </div>
  </div>
  );
};

export default PlaceholderCard;

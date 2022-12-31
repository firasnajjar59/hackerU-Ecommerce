/** @format */

import './categoryRound.scss';

const CategoryRound = props => {
  return (
    <div className='category-wrapper'>
      <div className='category-overlay'></div>
      <h4 className='category-title'>{props.title}</h4>
      <img
        className='category-img'
        src={props.src}
        alt={props.alt}
      />
    </div>
  );
};

export default CategoryRound;

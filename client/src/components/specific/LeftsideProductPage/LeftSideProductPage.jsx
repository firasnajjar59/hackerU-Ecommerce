/** @format */

import Button from 'components/common/Button/Button';
import SideSortComponent from '../../common/BoxContainer/BoxContainer';
import './leftSideProductPage.scss';

const LeftsideProductPage = () => {
  return (
    <div className='leftAside'>
      <SideSortComponent>
        <div className='colorComponent'>
          <p>Color</p>
          <div className='colorPicker'>
            <div
              className='color'
              style={{ backgroundColor: 'green' }}></div>
            <div
              className='color'
              style={{ backgroundColor: 'red' }}></div>
            <div
              className='color'
              style={{ backgroundColor: 'yellow' }}></div>
          </div>
        </div>
        <div className='custWrapper'>
          <p>Customize</p>
          <select
            name='custmize'
            id='custmizeSelection'>
            <option value='0'>Select</option>
            <option value='0'>Yes</option>
            <option value='0'>No</option>
          </select>
        </div>
        <div className='textareaCust'>
          <p>Notes</p>
          <textarea placeholder='Add note'
            id='custumizeText'/>
        </div>
      </SideSortComponent>
      <SideSortComponent>
        <div className='counterWrapper'>
          <p>Quantity</p>
          <input
            type='number'
            name=''
            id=''
            value="1"
          />
        </div>
        <p className='price'>600 $</p>
        <Button classes='primary-button'>Add To Cart</Button>
      </SideSortComponent>
    </div>
  );
};

export default LeftsideProductPage;

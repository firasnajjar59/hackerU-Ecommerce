/** @format */

import Button from 'components/common/Button/Button';
import './leftSideProductPage.scss';
import TextArea from 'components/common/Input/TextArea';
import BoxContainer from '../../common/BoxContainer/BoxContainer';

const LeftsideProductPage = (props) => {
  return (
    <div className={`leftAside ${props.classes}`}>
      <BoxContainer>
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
          
            <TextArea placeholder="Add note" id="custumizeText" />
        </div>
      </BoxContainer>
      <BoxContainer>
        <div className='counterWrapper'>
          <p>Quantity</p>
          <input
            type='number'
            name=''
            id=''
            value="1"
          />
        </div>
        <p className='price'>{props.product.price} $</p>
        <Button classes='primary-button'>Add To Cart</Button>
      </BoxContainer>
    </div>
  );
};

export default LeftsideProductPage;

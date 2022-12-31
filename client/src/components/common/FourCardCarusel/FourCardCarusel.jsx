/** @format */

import './fourCardCarusel.scss';
import Card from 'components/common/Card/Card';
import Ribbon from 'components/common/Ribbon/Ribbon';
const FourCardCarusel = props => {
  return (
    <div className='caruselWrapper'>
      <h2 dir={props.dir || 'ltr'}>Products</h2>
      <div className='caruselcardsWrapper'>
        <Card>
          <Ribbon>new</Ribbon>
        </Card>
        <Card>
          <Ribbon>new</Ribbon>
        </Card>
        <Card>
          <Ribbon>new</Ribbon>
        </Card>
        <Card>
          <Ribbon>new</Ribbon>
        </Card>

        <div className='arrow-btn-left'>
          <img
            src='./assets/icons/left.png'
            alt=''
          />
        </div>
        <div className='arrow-btn-right'>
          <img
            src='./assets/icons/right.png'
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default FourCardCarusel;

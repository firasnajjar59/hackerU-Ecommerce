/** @format */

import Card from 'components/common/Card/Card';
import Ribbon from 'components/common/Ribbon/Ribbon';
import SideSortComponent from 'components/common/BoxContainer/BoxContainer';
import FilterByElement from 'components/specific/FilterByElement/filterByElement/FilterByElement';
import { useSelector } from 'react-redux';

const Store = () => {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  document.title = 'Store | ofwood';
  const screenWidth = useSelector(state => state.screenSize.screenWidth);

  return (
    <div className='container m-auto'>
      <div className='row p-2 w-100'>
        <div className={screenWidth > 600 ? 'col-3' : 'col-sm'}>
          <div className='row'>
            <div className='col mt-3'>
              <SideSortComponent
                title='Filter By:'
                color={window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color')}>
                <FilterByElement
                  title='Category'
                  options={['Cabinet', 'Tables']}
                />
                <FilterByElement
                  title='Category'
                  options={['Cabinet', 'Tables']}
                />
              </SideSortComponent>
            </div>
          </div>
          <div className='row'>
            <div className='col mt-3'>
              <SideSortComponent
                title='Sort By:'
                color={window.getComputedStyle(document.documentElement).getPropertyValue('--third-color')}>
                <FilterByElement
                  title='Sort'
                  options={['Price', 'A-Z']}
                />
              </SideSortComponent>
            </div>
          </div>
        </div>
        <div className={screenWidth > 600 ? 'col-9' : 'col-sm'}>
          <div className='row'>
            {arr.map((el, indx) => (
              <div
                key={indx}
                className={screenWidth > 600 ? 'col-sm-4 p-3' : 'col-sm py-3'}>
                <Card>
                  <Ribbon>new</Ribbon>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;

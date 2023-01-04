/** @format */

import Accordion from 'components/common/Accordion/Accordion';
import './rightSideProductPage.scss';
import SideSortComponent from '../../common/BoxContainer/BoxContainer';
import Button from 'components/common/Button/Button';
import Comment from 'components/common/Comment/Comment';
import AddComment from 'components/common/Comment/AddComment';

const RightSideProductPage = () => {
  return (
    <div className='rightAside'>
      <SideSortComponent title='Description'>
        <p className='product-description'>desc</p>
      </SideSortComponent>
      <SideSortComponent>
        <Accordion />
      </SideSortComponent>

      <SideSortComponent title='Reviews'>
        <Comment/>
        <Comment/>
        <Comment/>
        <AddComment/>
      </SideSortComponent>
    </div>
  );
};

export default RightSideProductPage;

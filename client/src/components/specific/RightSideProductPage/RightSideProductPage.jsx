/** @format */

import Accordion from 'components/common/Accordion/Accordion';
import './rightSideProductPage.scss';
import SideSortComponent from '../../common/BoxContainer/BoxContainer';
import Comment from 'components/common/Comment/Comment';
import AddComment from 'components/common/Comment/AddComment';

const RightSideProductPage = (props) => {
  return (
    <div className='rightAside'>
      <SideSortComponent title='Description'>
        <p className='product-description'>{props.description}</p>
      </SideSortComponent>
      <SideSortComponent>
        <Accordion />
      </SideSortComponent>

      <SideSortComponent title='Reviews'>
        {props.reviews.length>0?props.reviews.map((item,indx)=><Comment key={indx} review={item} />):""}
        <AddComment/>
      </SideSortComponent>
    </div>
  );
};

export default RightSideProductPage;

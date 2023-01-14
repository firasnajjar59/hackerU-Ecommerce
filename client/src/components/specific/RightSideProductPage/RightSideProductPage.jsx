/** @format */

import Accordion from 'components/common/Accordion/Accordion';
import './rightSideProductPage.scss';
import Comment from 'components/common/Comment/Comment';
import AddComment from 'components/common/Comment/AddComment';
import BoxContainer from 'components/common/BoxContainer/BoxContainer';

const RightSideProductPage = (props) => {
  return (
    <div className={`rightAside ${props.classes}`}>
      <BoxContainer title='Description'>
        <p className='product-description'>{props.description}</p>
      </BoxContainer>
      <BoxContainer>
        <Accordion />
      </BoxContainer>

      <BoxContainer title='Reviews'>
        {props.reviews.length>0?props.reviews.map((item,indx)=><Comment key={indx} review={item} />):""}
        <AddComment onAddReview={props.onAddReview} id={props.id}/>
      </BoxContainer>
    </div>
  );
};

export default RightSideProductPage;

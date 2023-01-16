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
        {props.properties.length>0&&<div className="properties-wrapper">
        {props.properties.map((property,indx)=><div className='properties' key={indx}>
          <div key={`${property.name}`} className="properties-title">{property.name}:</div>
          <div key={`${property.option}`} className="properties-option">{property.option}</div>
          </div>
        )}
        </div>}
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

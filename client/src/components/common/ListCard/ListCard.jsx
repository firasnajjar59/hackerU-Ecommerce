/** @format */

import Button from '../Button/Button';
import './listCard.scss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ListCard = props => {
  const [display,setDisplay]=useState({
    edit:true
  })
  const history = useHistory();
  const { url } = useRouteMatch();
  useEffect(()=>{
    if(props.edit!=undefined){
      setDisplay(prev=>{
        prev.edit=props.edit
        return{
          ...prev
        }
      })
    }
  },[props.edit])
  const handleEditButton = () => {
    history.push({ pathname: `${url}/${props.slug}`, state: { id: props.id } });
  };

  return (
    <>
      <div className='product-list-card-wrapper'>
        <img
          src={
            props.src?.includes('http')
              ? props.src
              : `${process.env.REACT_APP_SERVER_URL}/images/${props.src}`
          }
          alt=''
        />
        <h5>{props.title}</h5>
        <div className='buttons-wrapper'>
          {display.edit?<Button
            onclick={handleEditButton}
            classes='primary-button'>
            Edit
          </Button>:""}
          <Button
            classes='danger-button'
            onclick={props.onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default ListCard;

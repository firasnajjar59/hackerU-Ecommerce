/** @format */

import { useEffect, useState } from 'react';
import './filterByElement.scss';
import Ul from '../List/Ul/Ul';
import  Li  from '../List/Li/Li';
import { useSelector } from 'react-redux';

const FilterByElement = props => {
  const screenWidth=useSelector(state=>state.screenSize.screenWidth)
  const [hidden,setHidden]=useState(screenWidth>600?false:true)
  useEffect(() => {
    setHidden(screenWidth>600?false:true)
  }, [screenWidth]);
  return (
    <div className='categore mt-1'>
      <div className='categore-title'>
        <h5 className='filter-title'>{props.title}</h5>
        <span
          id='icon'
          className='material-symbols-rounded' onClick={()=>{hidden?setHidden(false):setHidden(true)}}>
          add
        </span>
      </div>
      <div className='categore-Item'>
        <Ul classes={hidden?"hidden":""}>
          {props.options.map((item,indx) =><Li onclick={props.onclick} key={indx} classes={`ps-3`} title={item}/>)}
        </Ul>
      </div>
    </div>
  );
};

export default FilterByElement;

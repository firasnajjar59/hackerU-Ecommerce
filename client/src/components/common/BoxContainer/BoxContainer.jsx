/** @format */

import { useEffect, useRef } from 'react';
import './boxContainer.scss';
const BoxContainer = props => {
  const borderColor = useRef();
  useEffect(() => {
    if (props.color) {
      borderColor.current.style.borderColor = props.color;
    }
  }, []);
 
  return (
    <div
      className={`right ${props.classes}`}
      ref={borderColor}>
      <div className='filter-Wrapper'>
        {props.title && (
          <>
            <h2 className='title'>{props.title}</h2>
            <hr />
          </>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default BoxContainer;

/** @format */

import './ourCustemersCarusel.scss';
import { useEffect, useRef, useState } from 'react';
const OurCustemersCarusel = props => {
  const displayDiv = useRef();
  const div = useRef();
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  // eslint-disable-next-line no-unused-vars
  let globalAnimateID;
  useEffect(() => {
    displayDiv.current.style.height = `${
      displayDiv.current.offsetHeight + div.current.offsetHeight
    }px`;
  }, []);
  const animateCarusel=()=>{
    setCounter(counter - 1.7);
    if (div.current.offsetWidth > window.innerWidth) {
      div.current.style.left = `${counter}px`;
      if ((div.current.offsetWidth - window.outerWidth) * -1 >= counter)
        setCounter(0);
    }
  }
  useEffect(() => {
    if (timer === 1) {
      globalAnimateID=requestAnimationFrame(animateCarusel)
    }
    
  }, [counter, timer]);
  return (
    <div
      className='caruselOurCustemers'
      onMouseLeave={() => {
        setTimer(0);
      }}
      onMouseEnter={() => {
        setTimer(1);
      }}
      ref={displayDiv}>
      <div className='OurCustemers-title'>
        <h2 id='test'>Our Custumers</h2>
      </div>
      <div
        className='OurCustemersCards'
        
        ref={div}>
        {props.children}
      </div>
    </div>
  );
};

export default OurCustemersCarusel;

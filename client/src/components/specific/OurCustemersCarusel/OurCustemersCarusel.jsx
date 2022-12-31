/** @format */

import './ourCustemersCarusel.scss';
import { useEffect, useRef, useState } from 'react';
const OurCustemersCarusel = props => {
  const displayDiv = useRef();
  const div = useRef();
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    displayDiv.current.style.height = `${
      displayDiv.current.offsetHeight + div.current.offsetHeight
    }px`;
  }, []);
  useEffect(() => {
    if (timer === 1) {
      setTimeout(() => {
        setCounter(counter - 1);

        if (div.current.offsetWidth > window.innerWidth) {
          div.current.style.left = `${counter}px`;
          (div.current.offsetWidth - window.outerWidth) * -1
            ? console.log('hi')
            : console.log('bye');
          if ((div.current.offsetWidth - window.outerWidth) * -1 === counter)
            setCounter(0);
        }
      }, 10);
    }
  }, [counter, timer]);
  return (
    <div
      className='caruselOurCustemers'
      ref={displayDiv}>
      <div className='OurCustemers-title'>
        <h2 id='test'>Our Custumers</h2>
      </div>
      <div
        className='OurCustemersCards'
        onMouseLeave={() => {
          setTimer(0);
        }}
        onMouseEnter={() => {
          setTimer(1);
        }}
        ref={div}>
        {props.children}
      </div>
    </div>
  );
};

export default OurCustemersCarusel;

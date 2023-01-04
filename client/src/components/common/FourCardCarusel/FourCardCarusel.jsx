/** @format */

import './fourCardCarusel.scss';
import Card from 'components/common/Card/Card';
import Ribbon from 'components/common/Ribbon/Ribbon';
import productArr from 'data/product';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const FourCardCarusel = props => {
  const screenWidth=useSelector(state=>state.screenSize.screenWidth)
  const [cardToDisplay,setCardToDisplay]=useState({
    firstCard:0,
    secondCard:1,
    thirdCard:2,
    fourthCard:3,
  })
  const leftMove=()=>{
    setCardToDisplay(prev=>{
      prev.firstCard>0?prev.firstCard-=1:prev.firstCard=productArr.length-1
      prev.secondCard>0?prev.secondCard-=1:prev.secondCard=productArr.length-1
      prev.thirdCard>0?prev.thirdCard-=1:prev.thirdCard=productArr.length-1
      prev.fourthCard>0?prev.fourthCard-=1:prev.fourthCard=productArr.length-1
      return{...prev}
    })
  }
  const rightMove=()=>{
    setCardToDisplay(prev=>{
      prev.firstCard<productArr.length-1?prev.firstCard+=1:prev.firstCard=0
      prev.secondCard<productArr.length-1?prev.secondCard+=1:prev.secondCard=0
      prev.thirdCard<productArr.length-1?prev.thirdCard+=1:prev.thirdCard=0
      prev.fourthCard<productArr.length-1?prev.fourthCard+=1:prev.fourthCard=0
      return{...prev}
    })
  }

  return (
    <div className='caruselWrapper'>
      <h2 dir={props.dir || 'ltr'}>Products</h2>
      <div className='caruselcardsWrapper'>
        {screenWidth>600?<><Card title={productArr[cardToDisplay.firstCard].title} desc={productArr[cardToDisplay.firstCard].desc}>
          <Ribbon>{productArr[cardToDisplay.firstCard].ribbon}</Ribbon>
        </Card>
        <Card title={productArr[cardToDisplay.secondCard].title} desc={productArr[cardToDisplay.secondCard].desc}>
          <Ribbon>{productArr[cardToDisplay.secondCard].ribbon}</Ribbon>
        </Card>
        <Card  title={productArr[cardToDisplay.thirdCard].title} desc={productArr[cardToDisplay.thirdCard].desc}>
          <Ribbon>{productArr[cardToDisplay.thirdCard].ribbon}</Ribbon>
        </Card>
        <Card title={productArr[cardToDisplay.fourthCard].title} desc={productArr[cardToDisplay.fourthCard].desc}>
          <Ribbon >{productArr[cardToDisplay.fourthCard].ribbon}</Ribbon>
        </Card></>:productArr.map((item,indx)=><Card key={indx} title={item.title} desc={item.desc}>
          <Ribbon>{item.ribbon}</Ribbon>
        </Card>)}
        

        <div onClick={leftMove} className='arrow-btn-left'>
          <img
            src='./assets/icons/left.png'
            alt=''
          />
        </div>
        <div onClick={rightMove} className='arrow-btn-right'>
          <img
            src='./assets/icons/right.png'
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default FourCardCarusel;

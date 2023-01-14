/** @format */

import './fourCardCarusel.scss';
import Card from 'components/common/Card/Card';
import Ribbon from 'components/common/Ribbon/Ribbon';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlaceholderCard from '../PlaceholderCard/PlaceholderCard';
const FourCardCarusel = props => {
  const [productArr,setProductArr]=useState(props.arr)
  const screenWidth=useSelector(state=>state.screenSize.screenWidth)
  const [cardToDisplay,setCardToDisplay]=useState({
    firstCard:0,
    secondCard:1,
    thirdCard:2,
    fourthCard:3,
  })
  
  useEffect(()=>{
    setProductArr(props.arr)
  },[props.arr])
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
        {productArr.length>0?
        screenWidth>600?
        <>
        <Card _id={productArr[cardToDisplay.firstCard]._id} slug={productArr[cardToDisplay.firstCard].slug} title={productArr[cardToDisplay.firstCard].name} img={productArr[cardToDisplay.firstCard].imgs[0]} desc={productArr[cardToDisplay.firstCard].description}>
          <Ribbon>new</Ribbon>
        </Card>
        <Card _id={productArr[cardToDisplay.secondCard]._id} slug={productArr[cardToDisplay.secondCard].slug} title={productArr[cardToDisplay.secondCard].name} img={productArr[cardToDisplay.secondCard].imgs[0]} desc={productArr[cardToDisplay.secondCard].description}>
          <Ribbon>new</Ribbon>
        </Card>
        <Card _id={productArr[cardToDisplay.thirdCard]._id} slug={productArr[cardToDisplay.thirdCard].slug} title={productArr[cardToDisplay.thirdCard].name} img={productArr[cardToDisplay.thirdCard].imgs[0]} desc={productArr[cardToDisplay.thirdCard].description}>
          <Ribbon>new</Ribbon>
        </Card>
        <Card _id={productArr[cardToDisplay.fourthCard]._id} slug={productArr[cardToDisplay.fourthCard].slug} title={productArr[cardToDisplay.fourthCard].name} img={productArr[cardToDisplay.fourthCard].imgs[0]} desc={productArr[cardToDisplay.fourthCard].description}>
          <Ribbon>new</Ribbon>
        </Card>
        </>
        :
        productArr.map((product,indx)=><Card key={indx} slug={product.slug} _id={product._id} img={product.imgs[0]} title={product.name} desc={product.description}>
          <Ribbon>new</Ribbon>
        </Card>)
        :<>
        <PlaceholderCard/>
        <PlaceholderCard/>
        <PlaceholderCard/>
        <PlaceholderCard/>
        </>}

      
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

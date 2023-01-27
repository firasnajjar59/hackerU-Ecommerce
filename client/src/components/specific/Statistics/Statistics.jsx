/** @format */

import Box from 'components/common/Box/Box';
import './statistics.scss';
import BoxContainer from 'components/common/BoxContainer/BoxContainer';
import { useEffect, useState } from 'react';
import useOfwoodErrorhandler from 'components/common/Errors/errorhandler';
import axios from 'axios';
import PopularCard from 'components/common/PopularCard/PopularCard';
import Input from 'components/common/Input/Input';

const Statistics = () => {
    const d= new Date();
    const[yearState,setYearState]=useState()
    const [PopularWishlist, setPopularWishlist] = useState([]);
    const [PopularOrdered, setPopularOrdered] = useState([]);
    const [orderAmount, setOrderAmount] = useState();
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [currentMonthRevenue, setCurrentMonthRevenue] = useState();
    const [yearRevenue, setYearRevenue] = useState(0);
    const [maxRevenue, setMaxRevenue] = useState([]);
    const ofwoodErrorhandler = useOfwoodErrorhandler();
    let year = d.getFullYear();
    let month = d.getMonth()+1;
console.log(year);
  useEffect(() => {
    (async () => {
      try {
          const { data } = await axios.get('/v1/aggregation/popular-wishlist');
        setPopularWishlist(data);
    } catch (error) {
        ofwoodErrorhandler(error.response.data);
    }
})();
(async () => {
    try {
        const { data } = await axios.get(
            '/v1/aggregation/popular-ordered-product'
            );
                setPopularOrdered(data);
      } catch (error) {
        ofwoodErrorhandler(error.response.data);
      }
    })();
(async () => {
    try {
        let { data } = await axios.get(
            '/v1/aggregation/order-avg-amount'
            );
            setOrderAmount(data[0]);
        } catch (error) {
            ofwoodErrorhandler(error.response.data);
        }
    })();
    // 
  setYearState(year)
  }, []);
  useEffect(()=>{
    if(yearState){
        (async () => {
            try {
                let { data } = await axios.get(
                    `/v1/aggregation/monthamount/${yearState}`
                    );
                    if(data.length<12&&data.lenght>0){
                        let accumulator=0;
                        let counter=0;
                        console.log(data);
                        data=Array(12).fill(1).map((el,indx)=>{
                            accumulator++
                            console.log(accumulator);
                            console.log(counter);
                            if(data[counter]&&data[counter]._id==accumulator){
                                let obj=data[counter]
                                counter++
                                console.log(obj);
                                return obj
                            }else{
                                // counter=counter-1
                                return {
                                    _id:counter+1,
                                    productsSales:0,
                                    totalMonthlyRevenue:0
                                }
                            }
                        })
                        console.log(data);
                    }
                        setMonthlyRevenue(data);
          } catch (error) {
            console.log(error);
            // ofwoodErrorhandler(error.response.data);
          }
        })();
    }
  },[yearState])

  useEffect(()=>{
    if(monthlyRevenue.length>0){
        // 
        const max=Math.max(...monthlyRevenue.map(el=>el.totalMonthlyRevenue))
        setMaxRevenue(max)
        // 
        const sum = monthlyRevenue.reduce((accumulator, object) => {
            return accumulator + object.totalMonthlyRevenue;
          }, 0);
          setYearRevenue(sum)
        //   
        const currentMonth=monthlyRevenue.filter((el)=>el._id==month)
        if(currentMonth){
            setCurrentMonthRevenue(currentMonth[0])
        }
    }
  },[monthlyRevenue])

  return (
    <Box classes={'bg-secondary-ofwood'}>
      <h1>Statistics</h1>
      <Box>
        <div className='statistics'>
            {orderAmount&&<BoxContainer classes="statistic-unit">
                <div className="statistic-unit-details">
                <h6>{orderAmount.name}</h6>
                <p>{orderAmount.averageAmount.toString().split(".")[0]+ " $"}</p>
                </div>
            </BoxContainer>}
            {orderAmount&&<BoxContainer classes="statistic-unit">
                <div className="statistic-unit-details">
                <h6>Year Revenue</h6>
                <p>{`${yearRevenue} $`}</p>
                </div>
            </BoxContainer>}
            {currentMonthRevenue&&<BoxContainer classes="statistic-unit">
                <div className="statistic-unit-details">
                <h6>Current Month</h6>
                <p>{`${currentMonthRevenue.totalMonthlyRevenue} $`}</p>
                </div>
            </BoxContainer>}
            {currentMonthRevenue&&<BoxContainer classes="statistic-unit">
                <div className="statistic-unit-details">
                <h6>Current Month Sales</h6>
                <p>{`${currentMonthRevenue.productsSales} products`}</p>
                </div>
            </BoxContainer>}
             
        </div>
                <Box classes="bg-primary-opacity">
                 <div className='graph'>
                     <div className="graph-title-wrapper">
                         <h4 className='color-secondary-ofwood'>Revene</h4>
                         <Input type="number" classes="bg-secondary-ofwood" onchange={(ev)=>{setYearState(ev.target.value)}} value={yearState} placeholder="Year" />
                     </div>
                    {
                        monthlyRevenue.length>0?<div className="graph-wrapper">
                            <div className='graph-year'>
                                {monthlyRevenue.map((el)=><div className='month' style={{height:`${(el.totalMonthlyRevenue/maxRevenue)*85}%`}}><p>{el.totalMonthlyRevenue}</p></div>)}
                                
                            </div>
                        </div>:<div className='graph-wrapper no-data'><p>No data for year {yearState}</p></div>
                    }
                </div>
                </Box>

      </Box>
      <BoxContainer title='Popular ordered product'>
        <div className='popular-cards-wrapper'>
          {PopularOrdered.length > 0 ? (
            PopularOrdered.map((product, indx) => (
              <PopularCard
                title={product.name}
                desc={product.docs.description}
                slug={product.docs.slug}
                id={product._id}
                totalInWishlist={product.totalordered}
                ribbontitle='Orders'
                img={product.docs.imgs[0]}
                key={indx}
              />
            ))
          ) : (
            <div
              className='spinner-border '
              role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          )}
        </div>
      </BoxContainer>
      <BoxContainer title='Popular product in wishlist'>
        <div className='popular-cards-wrapper'>
          {PopularWishlist.length > 0 ?
            PopularWishlist.map((product, indx) => (
              <PopularCard
                title={product.wishlist[0].name}
                desc={product.wishlist[0].description}
                slug={product.wishlist[0].slug}
                id={product._id}
                ribbontitle='Likes'
                totalInWishlist={product.totalInWishlist}
                img={product.wishlist[0].imgs[0]}
                key={indx}
              />
            )):(
                <div
                  className='spinner-border '
                  role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              )}
        </div>
      </BoxContainer>
    </Box>
  );
};

export default Statistics;

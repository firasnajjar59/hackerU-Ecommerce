import { useEffect, useState } from 'react'
import './myOrders.scss'
import axios from 'axios'
import Box from 'components/common/Box/Box'
import DisplayOrder from 'components/specific/DisplayOrder/DisplayOrder'
import sortFunction from 'functions/sortByDate'


const MyOrders = () => {
    document.title = `My Orders | ofwood`;

    const [orders,setOrders]=useState([])
    useEffect(()=>{
        (async ()=>{
            try {
                const {data}=await axios.get('/v1/order/myorders')
                sortFunction(data.data.doc,setOrders)
            } catch (error) {
                console.log(error);
            }
        })()
    },[])
  return (
    <div className='container m-auto'>
        <div>
            <h1>My orders</h1>
            {orders.length>0?orders.map((order,indx)=><DisplayOrder key={indx} order={order}/>)
            :<Box classes="bg-secondary-ofwood mt-3"><h5 className='m-2'>No Orders Recived</h5></Box>}
            </div>
        </div>
        )
}

export default MyOrders
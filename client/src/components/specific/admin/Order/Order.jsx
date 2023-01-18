/** @format */

import Box from 'components/common/Box/Box';
import './order.scss';
import BoxContainer from 'components/common/BoxContainer/BoxContainer';
import Button from 'components/common/Button/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Order = () => {
  const history = useHistory();
  const {url}=useRouteMatch()
  console.log(url);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/v1/order');
        console.log(data);
        setOrders(data.data.doc);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const handleMoreInfoBtn = id => () => {
    history.push(`${url}/${id}`)
  };
  return (
    <div>
      <h1>Orders</h1>
      <Box classes='bg-secondary-ofwood'>
        {orders.length > 0
          ? orders.map((order, indx) => (
              <BoxContainer
                key={indx}
                classes='mt-2'
                title={`Order No. ${order._id}`}>
                <div className='row d-flex'>
                  <div className='col-sm-3 overflow-hidden py-1 px-1'>
                    <Box classes='w-100 bg-primary-opacity color-secondary-ofwood'>
                      Email
                    </Box>
                    <p className='overflow-hidden'>{order.user_id.email}</p>
                  </div>
                  <div className='col-sm-2 overflow-hidden py-1 px-1'>
                    <Box classes='w-100 bg-primary-opacity color-secondary-ofwood'>
                      Status
                    </Box>
                    <p className='overflow-hidden'>{order.status}</p>
                  </div>
                  <div className='col-sm-2 overflow-hidden py-1 px-1'>
                    <Box classes='w-100 bg-primary-opacity color-secondary-ofwood'>
                      Paid
                    </Box>
                    <p>{order.paid ? 'Yes' : 'No'}</p>
                  </div>
                  <div className='col-sm-3 overflow-hidden py-1 px-1'>
                    <Box classes='w-100 bg-primary-opacity color-secondary-ofwood flex-row justify-content-between'>
                      <p>Date</p>
                      <p>Time</p>
                    </Box>
                    <div className='d-flex justify-content-between'>
                      <p>{order.createdAt.split('T')[0]}</p>
                      <p>{order.createdAt.split('T')[1].split('.')[0]}</p>
                    </div>
                  </div>
                  <div className='col-sm-2 overflow-hidden py-1 px-1'>
                    <Button onclick={handleMoreInfoBtn(order._id)} classes='primary-button'>More info</Button>
                  </div>
                </div>
              </BoxContainer>
            ))
          : 'No orders'}
      </Box>
    </div>
  );
};

export default Order;

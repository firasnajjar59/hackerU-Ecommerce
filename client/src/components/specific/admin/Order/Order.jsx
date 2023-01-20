/** @format */

import Box from 'components/common/Box/Box';
import './order.scss';
import BoxContainer from 'components/common/BoxContainer/BoxContainer';
import Button from 'components/common/Button/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';
import SearchBar from 'components/specific/SearchBar/SearchBar';
import updateInputs from 'functions/updateInputs';
import Input from 'components/common/Input/Input';
import DropMenu from 'components/common/Input/DropMenu';
import { handleSearchBtn } from './orderPageFunctions';
import sortFunction from 'functions/sortByDate';

let ordersArr=[];
const Order = () => {
  document.title = `Orders | ofwood`;

  const history = useHistory();
  const {url}=useRouteMatch();
  const [orders, setOrders] = useState([]);
  const [inputs, setInputs] = useState({
    search:"",
    status:"Search By Status",
    paid:"",
    createdAt:""
  });
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/v1/order');
        ordersArr=data.data.doc;
        sortFunction(ordersArr,setOrders)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    let copyCards=JSON.parse(JSON.stringify(ordersArr))
    let regex=new RegExp(inputs.createdAt,"i")
    copyCards=copyCards.filter(item=>regex.test(item.createdAt))
    sortFunction(copyCards,setOrders)
  }, [inputs.createdAt]);
  useEffect(() => {
      let copyCards=JSON.parse(JSON.stringify(ordersArr))
    if(inputs.status!="Search By Status"){
        let regex=new RegExp(inputs.status,"i")
        copyCards=copyCards.filter(item=>regex.test(item.status))
    }
sortFunction(copyCards,setOrders)
}, [inputs.status]);
  useEffect(() => {
    let copyCards=JSON.parse(JSON.stringify(ordersArr))
    if(inputs.paid=="Yes"){
        copyCards=copyCards.filter(item=>item.paid)
    }else if(inputs.paid=="No"){
        copyCards=copyCards.filter(item=>!item.paid)
    }
    sortFunction(copyCards,setOrders)
  }, [inputs.paid]);
  const handleInputs = ev => updateInputs(ev, setInputs);
  const handleMoreInfoBtn = id => () => {
    history.push(`${url}/${id}`)
  };
  return (
    <div>
      <h1>Orders</h1>
      <Box classes='bg-secondary-ofwood'>
        <div className="row d-flex ">
            <div className="col-sm-3 px-1 py-1">
                <SearchBar classes="w-100" value={inputs.search} onclick={handleSearchBtn(inputs.search,ordersArr,setOrders)} onchange={handleInputs}/>
            </div>
            <div className="col-sm-3 px-1 py-1">
                <DropMenu datalabel="status" classes="custmizeSelection" onchange={handleInputs} options={["Search By Status", "The order has been received and is being processed","The order has been sent","The order has arrived"]} value={inputs.status} />
            </div>
            <div className="col-sm-3 px-1 py-1">
                <DropMenu datalabel="paid" classes="custmizeSelection"  onchange={handleInputs} options={["Search By paid", "Yes","No"]} value={inputs.paid} />
            </div>
            <div className="col-sm-3 px-1 py-1 d-flex gap-1">
                <Input datalabel="createdAt" type="date" value={inputs.createdAt} onchange={handleInputs} />
            </div>
        </div>
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

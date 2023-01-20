import MaterialIcon from 'components/common/MaterialIcon/MaterialIcon'
import './oneOrder.scss'
import { useHistory, useParams } from 'react-router-dom';
import Box from 'components/common/Box/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayOrder from 'components/specific/DisplayOrder/DisplayOrder';
import Button from 'components/common/Button/Button';
import DropMenu from 'components/common/Input/DropMenu';
import updateInputs from 'functions/updateInputs';

const OneOrder = () => {
const history=useHistory()
const {order_id}=useParams()
const [order,setOrder]=useState()
const [inputs,setInputs]=useState({
    paid:"true",
    status:"hi"
})
useEffect(()=>{
    (
        async ()=>{
            try {
                const {data}=await axios.get(`/v1/order/${order_id}`)
                setOrder(data.doc)
                setInputs(prev=>{
                    prev.paid=data.doc.paid;
                    prev.status=data.doc.status
                    return{
                        ...prev
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    )()
},[])

const handleInputs = ev => updateInputs(ev, setInputs);
const handleSelect = ev => {
    setInputs(prev=>{
        prev.paid=ev.target.value=="Yes"?true:false
        return{
            ...prev
        }
    })
}

const handleApplyBtn=async()=>{
    try {
        const {data} = await axios.patch(`/v1/order/${order_id}`,inputs)
    } catch (error) {
        console.log(error);
    }
}

    const backward = () => history.goBack();
  return (
    <div className="">
        <Box onclick={backward} classes="bg-secondary-ofwood back-btn mb-3">
            <MaterialIcon  title="arrow_back_ios" />
        </Box>
        {order&&
        <>
            <h3>{order.id}</h3>
            <Box classes="bg-secondary-ofwood">
            <DisplayOrder order={order}>
                <Box classes="bg-primary-opacity">
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-2 px-2 py-1">Status:</div>
                        <div className="col-sm-4 px-2 py-1"><DropMenu classes="custmizeSelection" options={['The order has been received and is being processed', 'The order has been sent', 'The order has arrived']} datalabel="status" onchange={handleInputs} value={inputs.status} /></div>
                        <div className="col-sm-1 px-2 py-1">Paid:</div>
                        <div className="col-sm-3 px-2 py-1"><DropMenu classes="custmizeSelection" options={['No','Yes']} value={inputs.paid?"Yes":"No"} datalabel="paid" onchange={handleSelect}/></div>
                        <div className="col-sm-2 px-2 py-1"><Button onclick={handleApplyBtn} classes="primary-button">Apply</Button></div>
                    </div>
                </Box>
            </DisplayOrder>
            </Box>
        </>
            }
        
    </div>
  )
}

export default OneOrder
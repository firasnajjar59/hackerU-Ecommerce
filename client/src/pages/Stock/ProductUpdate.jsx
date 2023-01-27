import axios from "axios";
import Button from "components/common/Button/Button"
import useOfwoodErrorhandler from "components/common/Errors/errorhandler";
import DropMenu from "components/common/Input/DropMenu"
import Input from "components/common/Input/Input"
import updateInputs from "functions/updateInputs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetMessage, setMessage } from "store/toast";

export const ProductUpdate = (props) => {
    const [stock,setStock]=useState({stock:0})
    const dispatch=useDispatch()
    const ofwoodErrorhandler=useOfwoodErrorhandler()
    useEffect(()=>{
        setStock({stock:props.stock})
    },[])

    const UpdateProduct= async()=>{
        try {
       
        await axios.patch(`/v1/products/${props.id}`,stock)
        dispatch(setMessage("The stock updated"))
            setTimeout(()=>{
              dispatch(resetMessage())
            },3000)
        } catch (error) {
          ofwoodErrorhandler(error.response.data)
        }
      }
    const handleInputs = ev => updateInputs(ev, setStock);

  return (
    <>
     <div className="select-wrapper">
                <DropMenu classes="custmizeSelection" value={stock.stock} datalabel="stock" optionValue={[0,5,10,15]} options={["Out of stock",5,10,15]} onchange={handleInputs} />
            </div>
            <div className="select-wrapper">
                <Input type="number" min="0" value={stock.stock} onchange={handleInputs} datalabel="stock" classes="custmizeSelection" />
            </div>
            <div className='btn-wrapper'>
            <Button onclick={UpdateProduct} classes="primary-button">Update Stock</Button>
            </div>
    </>
  )
}

import Box from 'components/common/Box/Box'
import './stock.scss'
import BoxContainer from 'components/common/BoxContainer/BoxContainer'
import DropMenu from 'components/common/Input/DropMenu'
import Input from 'components/common/Input/Input'
import { useEffect, useState } from 'react'
import updateInputs from 'functions/updateInputs'
import Button from 'components/common/Button/Button'
import axios from 'axios'
import { ProductUpdate } from './ProductUpdate'

const Stock = () => {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        (async()=>{
            try {
                const {data}=await axios.get("/v1/products")
                setProducts(data.data.doc)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        })()

    },[])

  return (
    <Box>
    <h2>Stock Mangment</h2>
    <Box classes={"bg-secondary-ofwood"}>
        {products.length>0&&products.map((product,indx)=><BoxContainer title={product.name}>
            <div className="stock-list">
            <div className="img-wrapper">
            <img src={product.imgs[0].includes('http')
              ? product.imgs[0]
              : `${process.env.REACT_APP_SERVER_URL}/images/products/${product.imgs[0]}`} alt="" />
            </div>
           <ProductUpdate id={product._id} stock={product.stock}/>
            </div>
        </BoxContainer>)}
    </Box>
    </Box>
  )
}

export default Stock
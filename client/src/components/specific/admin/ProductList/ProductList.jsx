import './productList.scss'
import { useEffect, useState } from 'react'
import ListCard from 'components/common/ListCard/ListCard'
import axios from 'axios'
import BoxContainer from 'components/common/BoxContainer/BoxContainer'

const ProductList = () => {
    const [arr,setArr]=useState()
    useEffect(()=>{
        (async ()=>{
          try {
            let {data:res}=await axios.get(`/v1/products?fields=name,imgs,slug`)
            setArr(res.data.doc)
          } catch (error) {
            console.log(error);
          }
        })()
      },[])

      const haundleLocalDelete=(id)=>async()=>{
        try {
          const data=await axios.delete(`/v1/products/${id}`)
          const filterdArr=arr.filter((item)=>item._id!=id)
          setArr(filterdArr)
      } catch (error) {
          console.log(error);
      }
      }
  return (
    <div>
        <h2 className='mb-3'>
            Product List
        </h2>
        <div className="products-list-wrapper bg-secondary-ofwood">
            {arr?arr.map((product,indx)=><BoxContainer key={indx}>
                <ListCard onDelete={haundleLocalDelete(product._id)} title={product.name} src={product.imgs[0]?.includes("http")?product.imgs[0]:`products/${product.imgs[0]}`} slug={product.slug} id={product._id}/>
            </BoxContainer>):""}
        </div>
    </div>
  )
}

export default ProductList
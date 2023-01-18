import './displayOrder.scss'
import Box from "components/common/Box/Box"
import BoxContainer from "components/common/BoxContainer/BoxContainer"


const DisplayOrder = (props) => {
  return (
    <BoxContainer classes="mt-3" title={`Order No. ${props.order._id}`}>
    <div className="time-wrapper">
        <p><span className='option-span'>Order created at:</span> {`${props.order.createdAt.split('T')[1].split(".")[0].split(":")[0]}:${props.order.createdAt.split('T')[1].split(".")[0].split(":")[1]}`}</p>
        <p>{props.order.createdAt.split('T')[0]}</p>
    </div>
    <p><span className='option-span'>Status:</span> {props.order.status}</p>
    <p><span className='option-span'>Paid:</span> {props.order.paid?"Yes":"Waiting for Payment"}</p>
    {props.order.products.map((product,indx)=>
    <Box key={indx} classes="bg-primary-opacity">
    <div  className="order-product-wrapper">
    <div className="order-img-wrapper">
        <img src={product.product_id.imgs[0].length>0&&product.product_id.imgs[0].startsWith("http")?product.product_id.imgs[0]:`${process.env.REACT_APP_SERVER_URL}/images/products/${product.product_id.imgs[0]}`} alt="" />
    </div>
    <div className="product-details-wrapper">
        <h5 className='w-100'><span className='option-span'>Product:</span> {product.product_id.name}</h5>
        <p className='w-100'><span className='option-span'>description:</span> {product.product_id.description}</p>
        <p><span className='option-span'>Quantity:</span> {product.quantity}</p>
        <p><span className='option-span'>Price:</span> {product.price}</p>
        {product.selectOption.map((option,indx)=><p key={indx}><span className='option-span'>{option.name}</span>: {option.option}</p>)}
        <p className='w-100'><span className='option-span'>Note:</span> {product.note}</p>
    </div>
    </div>
</Box>
    )
}
{props.children}
</BoxContainer>
  )
}

export default DisplayOrder
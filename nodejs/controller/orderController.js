const crypto = require('crypto');
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
const Orders = require("../models/orderModel");
const catchAsync = require("../services/catchAsync");
const AppError = require('../utils/appError');
const functionsFactory = require('../services/functionsFactory');


//
const getCheckoutSession = catchAsync(async (req,res,next)=>{
    const orderToken=req.doc.createOrderToken()
    await req.doc.save()
    // get product
    const orders=req.doc.cart
    const products=orders.map(product=>{
        return{
            price_data: {
                currency: 'usd',
                unit_amount: product.product_id.price*100,
                product_data: {
                  name: `${product.product_id.name}`,
                  description: `${product.product_id.description}`,
                  images: [`https://cdn2.downdetector.com/static/uploads/logo/Google-new_19.png`],
                },
              },
            quantity:product.quantity
        }
    })
// creat session
    const session= await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        success_url:`http://localhost:3000/order/${orderToken}`,
        cancel_url:`${process.env.REACT_APP_URL}/cart`,
        customer_email:req.doc.email,
        mode: 'payment',
        line_items:products
    })
// send to client
res.status(200).json({
    status:'success',
    session
})
});
// 
const placeOrder=catchAsync(async(req,res,next)=>{
    // 
    const orderToken=crypto
    .createHash('sha256')
    .update(req.params.ordertoken)
    .digest('hex');
    // 
    if(req.doc.orderToken!=orderToken)next(new AppError("Please provide a valid token",401))
    //create order
    const order={
        products:req.doc.cart,
        user_id:req.doc._id,
    }
    const createdOrder=await Orders.create(order)
    // delete order token
    req.doc.orderToken=undefined
    // delete cart from user
    req.doc.cart=[]
    const newUser=await req.doc.save()
    req.doc=newUser;

    // next middleware to generate new token
    next()
})
// 
const getMyOrders=functionsFactory.getAllDocumantsNOQuery(Orders)
// 
const getOrders=functionsFactory.getAllDocumantsNOQuery(Orders)
// 
const getOrderById=functionsFactory.getDocumantByID(Orders)
// 
const updatOrderById=functionsFactory.updateDocumantByID(Orders)
// 
const userIdToBody=(req,res,next)=>{
    req.body.user_id=req.doc._id
    next()
}

module.exports = {
    getCheckoutSession,
    placeOrder,
    getMyOrders,
    userIdToBody,
    getOrders,
    getOrderById,
    updatOrderById
  };
  
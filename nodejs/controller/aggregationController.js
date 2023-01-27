/** @format */
const crypto = require('crypto');

const Users = require('../models/userModel');
const Orders = require('../models/orderModel');
const catchAsync = require('../services/catchAsync');
//
const popularWishlist=catchAsync(async(req,res,next)=>{
    let data=await Users.aggregate([
        {$unwind:"$wishlist"},
        {$group:{
            _id:"$wishlist",
            totalInWishlist:{$sum:1}
        }},
        {
            $addFields:{
                wishlist:"$_id"
            }
        },
        {
            $sort:{totalInWishlist:-1}
        },
        {
            $limit : 4
        }
    ])
    data=await Users.populate(data,{ path: 'wishlist', select: 'name imgs price slug description' })
    res.status(200).json(data)
})
const popularOrderedProduct=catchAsync(async(req,res,next)=>{
    let data=await Orders.aggregate([
        {$unwind:"$products"},
        {$group:{
            _id:"$products.product_id.name",
            totalordered:{$sum:"$products.quantity"},
            totalOrders:{$sum:1},
            docs: {
                $push: '$$ROOT'
              }
        }},
        {
            $addFields:{
                name:"$_id"
            }
        },
        {
            $sort:{totalordered:-1}
        },
        {
            $project:{
                _id:0
            }
        },
        {
            $limit : 4
        }
    ])
    data=data.map((el)=>{
        el.docs=el.docs[0].products.product_id
        return el
    })
    res.status(200).json(data)
})
const ordersAvgAmount=catchAsync(async(req,res,next)=>{
    let data=await Orders.aggregate([
        {$unwind:"$products"},
        {$group:{
            _id:"$_id",
            orderAmount:{$sum:{$multiply:["$products.quantity","$products.price"]}},
        }},
        {$group:{
            _id:null,
            averageAmount:{$avg:"$orderAmount"},
        }},
        {
            $addFields:{
                name:"Average order Amount"
            }
        },
        {
            $sort:{orderAmount:-1}
        },
        {
            $project:{
                _id:0
            }
        }
    ])
  
    res.status(200).json(data)
})
const monthAmount=catchAsync(async(req,res,next)=>{
    const {year}=req.params
    let data=await Orders.aggregate([
        {$match:{createdAt:{
            $gte:new Date(`${year}-01-01`),
            $lte:new Date(`${year}-12-31`)
        }}},
        {$unwind:"$products"},
        {
            $addFields:{
                orderAmount:{$multiply:["$products.quantity","$products.price"]}
            }
        },
        {$group:{
            _id:{$month:"$createdAt"},
            productsSales:{$sum:1},
            totalMonthlyRevenue:{$sum:"$orderAmount"},
        }},
        {
            $sort:{_id:1}
        },
       
    ])
  
    res.status(200).json(data)
})
module.exports = {
    popularWishlist,
    popularOrderedProduct,
    ordersAvgAmount,
    monthAmount
};

/** @format */

const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  products: [
    {
      product_id: {id:{ type: mongoose.Schema.Types.ObjectId, ref: 'products' },
      name:{type:String},
      description:{type:String},
      imgs:[String],
      price: { type: Number }},
      note:{type:String},
      selectOption: [
        {
          name: { type: String },
          option: String,
        },
      ],
      quantity: { type: Number },
      price:{type:Number},
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'The order should be belong to user'],
  },
  paid:{type:Boolean,default:true},
  status:{
    type: String,
    required: true,
    enum: ['The order has been received and is being processed', 'The order has been sent', 'The order has arrived'],
    default: 'The order has been received and is being processed',
  },
  createdAt: { type: Date, default: Date.now },
},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
}
);
//* document middleware
ordersSchema.pre(/^find/,function(next){
  this.populate({path:'user_id',select:'email'})
  next()
})
//* Query middleware

//* virtual fields

//* after finish save

const Orders = mongoose.model('orders', ordersSchema);
module.exports = Orders;

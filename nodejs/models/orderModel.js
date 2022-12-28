/** @format */

const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: [true, 'The order should be belong to product'],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'The order should be belong to user'],
  },
  price: { type: Number, required: [true, 'A product must have a price'] },
  createdAt: { type: Date, default: Date.now },
},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
}
);
//* document middleware

//* Query middleware

//* virtual fields

//* after finish save

const Orders = mongoose.model('orders', ordersSchema);
module.exports = Orders;

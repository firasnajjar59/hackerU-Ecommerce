/** @format */

const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please enter your name'] },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  userName: { type: String, required: true },
  activeUser: { type: Boolean, default: true, select: false },
  phone: { type: String, required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }],
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user', 'contributor'],
    default: 'user',
    select: false,
  },
  password: { type: String, required: true, select: false },
  passwordUpdated: { type: Date, select: false },
  payment: {
    type: [
      {
        cardNumber: { type: Number },
        expDate: { type: String },
        cvv: { type: String },
        id: { type: Number },
      },
    ],
    select: false,
  },
  birthday: { type: Date },
  userImg: { type: String },
  address: { type: String },
});
const Users = mongoose.model('users', usersSchema);

module.exports = Users;

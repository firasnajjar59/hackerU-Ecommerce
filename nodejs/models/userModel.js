/** @format */

const mongoose = require('mongoose');
const validator = require('validator');
const { createHash } = require('../config/bcrypt');
const crypto = require('crypto');

const usersSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please enter your name'] },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid e-mail'],
  },
  userImg: { type: String,default:'default.jpg' },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    minlength: 8,
    select: false,
    validate: {
      // works only on save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not same',
    },
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
  },
  passwordUpdatedAt: { type: Date },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
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
  address: { type: String },
});
// document mongoose middleware
// * hashing password before saving it in the database
usersSchema.pre('save', async function (next) {
  // if we not changing the password field so we can pass this middleware
  if (!this.isModified('password')) return next();
  // if we changing the password so we need to hash it before we save it
  this.password = await createHash(this.password, 12);
  // after we validate that the password and the confirm password are same
  // we can delete this field no need to save it the database
  this.passwordConfirm = undefined;
  // at the end we call the next function to pass to the next middleware
  next();
});
// save when the password changed
usersSchema.pre('save',function(next){
  if(!this.isModified('password')||this.isNew)return next()
  this.passwordUpdatedAt=Date.now()-3000;
  next()
})
// query middleware
usersSchema.pre(/^find/,function (next){
  this.find({activeUser:true})
  next()
})
// method
usersSchema.methods.changedPasswordAfter = function (JWTTimesStamp) {
  // this field build only when user change password so we check
  // if user have this field that mean he change his password so
  // we should check if the token provided before changing the password
  // if the field doesnt exist so the user didnt change his password so we can
  // return false
  // * false means the user didnt change password after the token we recive
  if (this.passwordUpdatedAt) {
    const passwordUpdatedAtStamp = parseInt(this.passwordUpdatedAt.getTime() / 1000, 10);
    return passwordUpdatedAtStamp > JWTTimesStamp;
  }
  return false;
};
usersSchema.methods.createPasswordResetToken = function () {
  // build a random string by buildin crypto
  const resetToken = crypto.randomBytes(32).toString('hex');
  // we hash the random string we generate one step before and save it in database
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  // here we give the token an expire date and store it in the database
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  console.log({ resetToken }, this.passwordResetToken);
  // we return the password
  return resetToken;
};

const Users = mongoose.model('users', usersSchema);

module.exports = Users;

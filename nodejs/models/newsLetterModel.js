/** @format */

const mongoose = require('mongoose');
const validator = require('validator');

const newsLetterSchema = new mongoose.Schema(
  {
    newsletterEmail: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      min: [6, 'E-mail should contain minimum 6 letters'],
      max: [1024, 'Email can contain maximum 1024 letters'],
      validate: [validator.isEmail, 'Please provide a valid e-mail'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//* document middleware

//* Query middleware

//* virtual fields

//* after finish save
newsLetterSchema.post('save', function (next) {
  this.__v = undefined;
});
const NewsLetter = mongoose.model('newsletter', newsLetterSchema);
module.exports = NewsLetter;

/** @format */

const mongoose = require('mongoose');

const gallarySchema = new mongoose.Schema(
  {
    alt: { type: String, required:[true,"Please give a name for this content. must be unique"] },
    caption: { type: String,required:[true,"Please give a name for this content. must be unique"] },
    img: { type: String },
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
gallarySchema.post('save', function (next) {
  this.__v = undefined;
});
const Gallary = mongoose.model('gallary', gallarySchema);
module.exports = Gallary;

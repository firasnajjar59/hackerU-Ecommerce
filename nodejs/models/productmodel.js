/** @format */

const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'A product must have a name'],
    validate:[validator.isAlpha,'Product name must only contain characters']
  },
  slug:{
    type:String
  },
  description: {
    type: String,
    required: [true, 'A product must have a description'],
  },
  imgs: [{ type: String }],
  price: { type: Number, required: [true, 'A product must have a price'] },
  createdAt: { type: Date },
  premium:{type:Boolean,default:false}
});
//* document middleware
productsSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});
productsSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//* Query middleware
productsSchema.pre(/^find/,function (next){
  this.find({premium:{$ne:true}})
  next()
})

const Products = mongoose.model('products', productsSchema);
module.exports = Products;














//* after finish save
// productsSchema.post('save', function (doc,next) {
//   console.log("done");
//   next();
// });
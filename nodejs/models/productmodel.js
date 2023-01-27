/** @format */

const mongoose = require('mongoose');
const slugify = require('slugify');
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'A product must have a name'],
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'A product must have a description'],
  },
  imgCover: [{ type: String }],
  imgs: [{ type: String }],
  price: { type: Number, required: [true, 'A product must have a price'] },
  createdAt: { type: Date },
  premium: { type: Boolean, default: false },
  selectOption:[
    {
      name:{type:String},
      option:[String]
    }
  ],
  properties:[
    {
      name:{type:String},
      option:{type:String}
    }
  ],
  category:[String],
  stock:{type:Number,default:1,}
},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
}
);

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
productsSchema.pre(/^find/, function (next) {
  this.find({ premium: { $ne: true } });
  next();
});
//* virtual fields
productsSchema.virtual('reviews', {
  ref: 'reviews',
  foreignField: 'productId',
  localField: '_id',
});

const Products = mongoose.model('products', productsSchema);
module.exports = Products;

//* after finish save
// productsSchema.post('save', function (doc,next) {
//   console.log("done");
//   next();
// });

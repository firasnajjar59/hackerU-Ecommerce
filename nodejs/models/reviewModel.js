/** @format */

const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: [true, 'A productId must have a product Id'],
  },
  reviewValue: {
    type: String,
    required: [true, 'A reviewValue must have a content'],
  },
  rating:{
    type:Number,
    min:1,
    max:5
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'A user_id must have a user Id'],
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

// document middleware
reviewsSchema.pre(/^find/,function(next){
    this.populate({path:'user_id',select:'userImg userName'})
    next()
})

// query middleware


// deleting __v field from returned data
reviewsSchema.post('save',function(next){
    this.__v=undefined
})
const Reviews = mongoose.model('reviews', reviewsSchema);

module.exports = Reviews;

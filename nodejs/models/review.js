const mongoose = require("mongoose");

const reviewsSchema=new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products",required:true },
    reviewValue:{type:String,required:true},
    user_id:{type: mongoose.Schema.Types.ObjectId,ref: "users",required:true}
})
const Reviews = mongoose.model("reviews",reviewsSchema)
const createReviewDB = (userInput) => {
  const review = new Reviews(userInput);
  return review.save();
};
module.exports = {
  createReviewDB
  };
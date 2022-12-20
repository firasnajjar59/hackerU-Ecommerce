const mongoose = require("mongoose");

const reviewsSchema=new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products",required:[true,"A productId must have a product Id"] },
    reviewValue:{type:String,required:[true,"A reviewValue must have a content"]},
    user_id:{type: mongoose.Schema.Types.ObjectId,ref: "users",required:[true,"A user_id must have a user Id"]}
})
const Reviews = mongoose.model("reviews",reviewsSchema)

module.exports = Reviews;
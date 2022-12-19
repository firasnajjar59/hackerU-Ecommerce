const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: { type: String, required: [true,"A product must have a name"] },
  description: { type: String, required: [true,"A product must have a description"] },
  imgs: [{ type: String }],
  price:{type:String,required:[true,"A product must have a price"]}
});
const Products = mongoose.model("products", productsSchema);

module.exports = Products;

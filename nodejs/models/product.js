const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imgs: [{ type: String }],
});
const Products = mongoose.model("products", productsSchema);
const createProductDB = (userInput) => {
  const product = new Products(userInput);
  return product.save();
};
module.exports = {
  createProductDB,
};

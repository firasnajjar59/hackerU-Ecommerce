const mongoose = require("mongoose");

const ordersSchema=new mongoose.Schema({
    
    user_id:{type: mongoose.Schema.Types.ObjectId,ref: "users",}
})
const Orders = mongoose.model("orders",ordersSchema)

module.exports = {

  };
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  activeUser: { type: Boolean, default: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  cart: [
    { type: mongoose.Schema.Types.ObjectId, ref: "products" } 
  ],
  wishlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: "products" } 
  ],
  orders: [
    { type: mongoose.Schema.Types.ObjectId, ref: "orders" }
  ],
  role: {
    type: String,
    required: true,
    enum: ["admin", "user", "contributor"],
    default: "user",
  },
  password: { type: String, required: true },
  passwordUpdated: { type: Date },
  payment: [
    {
      cardNumber: { type: Number },
      expDate: { type: String },
      cvv: { type: String },
      id: { type: Number },
    },
  ],
  birthday: { type: Date },
  userImg: { type: String },
  address: { type: String },
});
const Users = mongoose.model("users", usersSchema);

const createUserDB=(userInput)=>{
    const user=new Users(userInput)
    return user.save()
}

module.exports = {
    createUserDB
};
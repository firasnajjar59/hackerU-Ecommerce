const mongoose = require("mongoose");


const adminsSchema=new mongoose.Schema({

})
const Admins = mongoose.model("admins",adminsSchema)

module.exports = Admins
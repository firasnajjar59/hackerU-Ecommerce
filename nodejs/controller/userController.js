const Users = require("../models/user")
const functionsFactory=require("./functionsFactory")


const createUser =  functionsFactory.createDocumant(Users)
const getAllUsers =  functionsFactory.getAllDocumants(Users)
const deletUser =  functionsFactory.deleteDocumant(Users)

  module.exports={createUser,getAllUsers,deletUser}
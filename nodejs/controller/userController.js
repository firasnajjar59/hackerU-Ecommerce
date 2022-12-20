const Users = require("../models/userModel")
const functionsFactory=require("../services/functionsFactory")


const createUser =  functionsFactory.createDocumant(Users)
const getAllUsers =  functionsFactory.getAllDocumants(Users)
const deletUser =  functionsFactory.deleteDocumant(Users)

  module.exports={createUser,getAllUsers,deletUser}
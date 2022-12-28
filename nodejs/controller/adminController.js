const Users = require('../models/userModel');
const functionsFactory = require('../services/functionsFactory');

//
const createAdmin = functionsFactory.createDocumant(Users);
// 
const deletUser = functionsFactory.deleteDocumant(Users);
// 
const updateUser = functionsFactory.updateDocumantByID(Users);

module.exports = {
    createAdmin,deletUser,updateUser
  };
  
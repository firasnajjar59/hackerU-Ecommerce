const Products = require('../models/productmodel');
const functionsFactory = require('../services/functionsFactory');
const AppError = require('../utils/appError');

// 
const getAllCartProducts = functionsFactory.getAllDocumantsNOQuery(Products);


module.exports = {
    getAllCartProducts
  };
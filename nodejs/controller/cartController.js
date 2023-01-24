const Products = require('../models/productModel');
const functionsFactory = require('../services/functionsFactory');
const AppError = require('../utils/appError');

// 
const getAllCartProducts = functionsFactory.getAllDocumantsNOQuery(Products);


module.exports = {
    getAllCartProducts
  };
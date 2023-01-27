const Products = require('../models/productModel');
const functionsFactory = require('../services/functionsFactory');

// 
const getAllCartProducts = functionsFactory.getAllDocumantsNOQuery(Products);


module.exports = {
    getAllCartProducts
  };
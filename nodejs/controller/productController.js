/** @format */

const Products = require('../models/productmodel');
const functionsFactory = require('../services/functionsFactory');
const AppError = require('../utils/appError');

const createProduct = functionsFactory.createDocumant(Products);
const getAllProducts = functionsFactory.getAllDocumants(Products);
const deleteProduct = functionsFactory.deleteDocumant(Products);
const getProductByID = catchAsync(async (req, res, next) => {
  const doc = await Products.findById(req.params.id).populate('reviews');
  if (!doc) {
    return next(new AppError('document not found', 404));
  }
  res.json({ status: 'success', doc });
});

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductByID,
};

// exports.getDocumantByID = Model =>
// catchAsync(async (req, res, next) => {
//   const doc = await Model.findById(req.params.id);
//   if (!doc) {
//     return next(new AppError('document not found', 404));
//   }
//   res.json({ status: 'success', doc });
// });

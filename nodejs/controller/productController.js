/** @format */

const { upload } = require('../middlewares/multer');
const Products = require('../models/productModel');
const functionsFactory = require('../services/functionsFactory');
const AppError = require('../utils/appError');
//
const uploadProductPhotos = upload.array('images', 3);
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
//
const updateProduct = functionsFactory.updateDocumantByID(Products);
//
const handleOptionsInReq = (req, res, next) => {
  console.log(req.body);
  if (req.body.selectOption) {
    req.body.selectOption = JSON.parse(req.body.selectOption);
  }
  if (req.body.properties) {
    req.body.properties = JSON.parse(req.body.properties);
  }
  next();
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductByID,
  uploadProductPhotos,
  handleOptionsInReq,
  updateProduct,
};

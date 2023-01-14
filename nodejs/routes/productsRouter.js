/** @format */

const express = require('express');
const router = express.Router();
const checkIdInParams = require('../middlewares/checkIdInParams');
const productController = require('../controller/productController');
const cartController = require('../controller/cartController');
const permissionTo = require('../middlewares/permissionTo');
const protect = require('../middlewares/protect');
const reviewsRouter = require('./reviewsRouter');
const { resizeMultiPhotos } = require('../middlewares/multer');

router.param('id', checkIdInParams);
/* /api/v1/products nesting route */
// router.use('/product/:id', reviewsRouter);
router.use('/product/:id', reviewsRouter);

/* /api/v1/products */
router
  .route('/')
  .get(productController.getAllProducts)
  .post(protect, permissionTo('admin'),productController.uploadProductPhotos,resizeMultiPhotos,productController.handleOptionsInReq, productController.createProduct);
  
  /* /api/v1/products/cart */
  router
    .route('/cart')
    .post(cartController.getAllCartProducts)

/* /api/v1/products/:productId get user products */
router
  .route('/:id')
  .get(productController.getProductByID)
  .patch(protect, permissionTo('admin', 'contributor'),productController.uploadProductPhotos,resizeMultiPhotos,productController.handleOptionsInReq, productController.updateProduct)
  .delete(
    protect,
    permissionTo('admin', 'contributor'),
    productController.deleteProduct
  );

module.exports = router;

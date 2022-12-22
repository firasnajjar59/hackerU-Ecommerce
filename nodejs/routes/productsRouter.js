/** @format */

const express = require('express');
const router = express.Router();
const checkIdInParams = require('../middlewares/checkIdInParams');
const productController = require('../controller/productController');
const permissionTo = require('../middlewares/permissionTo');
const protect = require('../middlewares/protect');
const reviewsRouter = require('./reviewsRouter');

router.param('id', checkIdInParams);
/* /api/v1/products nesting route */
/*
 *
 *
 */
// router.use('/product/:id', reviewsRouter);
router.use('/product/:id', reviewsRouter);


/* /api/v1/products */
/*
 * no token need
 *
 */
router
  .route('/')
  .get(productController.getAllProducts)
  .post(protect, permissionTo('admin'),productController.createProduct);

/* /api/v1/products/:productId get user products */
/*
 * token need
 *
 *
 */
router
  .route('/:id').get(productController.getProductByID)
  .patch(protect, permissionTo('admin', 'contributor'),(req, res) => {
    res.json({ data: 'PUT /api/v1/products update product' });
  }).delete(protect, permissionTo('admin', 'contributor'),productController.deleteProduct);

module.exports = router;

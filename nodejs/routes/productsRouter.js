/** @format */

const express = require('express');
const router = express.Router();
const productFunc = require('../models/product');
const checkRole = require('../middlewares/cheackRole');
const checkIdInParams = require('../middlewares/checkIdInParams');
const productController = require("../controller/productController")

router.param("id",checkIdInParams)

/* /api/v1/products get all products */
/*
 * no token need
 *
 */
router.get('/', productController.getAllProducts);

/* /api/v1/products/my-products/:userId get user products */
/*
 * token need
 *
 *
 */
router.get('/my-products/:id', checkRole.user, async (req, res) => {
  try {
    if (req.headers.token) {
      res.json({ data: 'GET /api/v1/products/my-products/:userId get user products' });
    } else {
      throw 'no Token';
    }
  } catch (error) {
    res.json({ error });
  }
});

/* /api/v1/products/:productId get one product */
/*
 * no token need
 *
 *
 */
router.get('/product/:id', productController.getProductByID);

/* /api/v1/products add product */
/*
 * token need
 *
 *
 */
router.post('/', productController.createProduct);

/* /api/v1/products update product */
/*
 * token need
 * check if user have permission to delete card "admin or card owner"
 *
 */
router.put('/', (req, res) => {
  res.json({ data: 'PUT /api/v1/products update product' });
});

/* /api/v1/products delete product */
/*
 * token need
 * check if user have permission to delete card "admin or card owner"
 *
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;

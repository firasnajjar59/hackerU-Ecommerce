/** @format */

const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const aggregationController = require('../controller/aggregationController');
const permissionTo = require('../middlewares/permissionTo');
/* /api/v1/aggregation */
router.use(protect)
router.use(permissionTo('admin'))
router.get('/popular-wishlist',aggregationController.popularWishlist)
router.get('/popular-ordered-product',aggregationController.popularOrderedProduct)
router.get('/order-avg-amount',aggregationController.ordersAvgAmount)
router.get('/monthamount/:year',aggregationController.monthAmount)

module.exports = router;

/** @format */

const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const orderController = require('../controller/orderController');
const generateToken = require('../middlewares/generateToken');
const permissionTo=require('../middlewares/permissionTo')
router.get('/',protect, permissionTo('admin','contributor'),orderController.getOrders)
router.get('/checkout',protect,orderController.getCheckoutSession)
router.get('/placeorder/:ordertoken',protect,orderController.placeOrder,generateToken)
router.get('/myorders',protect,orderController.userIdToBody,orderController.getMyOrders)
router.route('/:id').get(protect, permissionTo('admin','contributor'),orderController.getOrderById).patch(protect, permissionTo('admin','contributor'),orderController.updatOrderById)

module.exports = router;

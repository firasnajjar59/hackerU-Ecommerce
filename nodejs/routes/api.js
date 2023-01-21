const express = require('express');
const router = express.Router();
const productsRouter = require("./productsRouter");
const usersRouter = require("./usersRouter");
const reviewsRouter = require("./reviewsRouter");
const orderRouter = require("./orderRouter");
const gallaryRouter = require("./gallaryRouter");
const newsletterRouter = require("./newsletterRouter");

/* GET Products Router. */
router.use('/products', productsRouter);
/* GET Users Router. */
router.use('/users', usersRouter);
/* GET reviews Router. */
router.use('/reviews', reviewsRouter);
/* GET reviews Router. */
router.use('/order', orderRouter);
/* GET reviews Router. */
router.use('/gallary', gallaryRouter);
/* GET reviews Router. */
router.use('/newsletter', newsletterRouter);

module.exports = router;

const express = require('express');
const router = express.Router();
const productsRouter = require("./productsRouter");
const usersRouter = require("./usersRouter");
const adminRouter = require("./adminRouter");
const reviewsRouter = require("./reviewsRouter");

/* GET Products Router. */
router.use('/products', productsRouter);
/* GET Users Router. */
router.use('/users', usersRouter);
/* GET Admin Router. */
router.use('/admin', adminRouter);
/* GET Admin Router. */
router.use('/reviews', reviewsRouter);

module.exports = router;

const express = require('express');
const router = express.Router();
const productsRouter = require("./products/products");
const usersRouter = require("./users/users");
const adminRouter = require("./admin/admin");
const reviewsRouter = require("./reviews/reviews");

/* GET Products Router. */
router.use('/products', productsRouter);
/* GET Users Router. */
router.use('/users', usersRouter);
/* GET Admin Router. */
router.use('/admin', adminRouter);
/* GET Admin Router. */
router.use('/reviews', reviewsRouter);

module.exports = router;

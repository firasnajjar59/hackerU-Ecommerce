/** @format */

const express = require('express');
// mergeParams because review is nested router and we need access to the params from the products router
const router = express.Router({ mergeParams: true });
const reviewController = require('../controller/reviewController');
const permissionTo = require('../middlewares/permissionTo');
const protect = require('../middlewares/protect');

/* /api/v1/reviews */
router
  .route('/')
  .get(protect,permissionTo('admin', 'contributor'),reviewController.getAllReviews)
  .post(protect,reviewController.createReview);
/* api/v1/products/product/:productID/reviews get reviews for product */
router.get('/reviews', reviewController.getReviewsByproductId);
/* /api/v1/reviews/my-reviews */
router
  .route('/review/:id')
  .get(protect,permissionTo('admin', 'contributor'),reviewController.getReviewByID)
  .delete(protect,permissionTo('admin', 'contributor'),reviewController.deleteReview)
 




module.exports = router;

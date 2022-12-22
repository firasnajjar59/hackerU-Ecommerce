/** @format */

const express = require('express');
// mergeParams because review is nested router and we need access to the params from the products router
const router = express.Router({ mergeParams: true });
const reviewController = require('../controller/reviewController');

/* /api/v1/reviews */
/*
 * no token need
 */
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);
/* api/v1/products/product/:productID/reviews get reviews for product */
/*
 * token need
 */
router.get('/reviews', reviewController.getReviewsByproductId);
/* /api/v1/reviews/my-reviews */
/*
 * token need
 */
router
  .route('/review/:id')
  .get(reviewController.getReviewByID)
  .delete(reviewController.deleteReview)
  .patch((req, res) => {
    res.json({ data: 'PUT /api/v1/reviews update review' });
  });




module.exports = router;

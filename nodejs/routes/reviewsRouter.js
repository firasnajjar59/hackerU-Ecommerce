const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController")

/* /api/v1/reviews get all reviews */
/*
* no token need
*/
router.get("/", reviewController.getAllReviews);

/* /api/v1/reviews/my-reviews get user reviews */
/*
* token need
*/
router.get("/:id", reviewController.getReviewsByUserID);
/* /api/v1/reviews get one review */
/*
* no token need
*/
router.get("/review/:id", reviewController.getReviewByID);

/* /api/v1/reviews add review */
/*
* token need
*/
router.post("/",reviewController.createReview);

/* /api/v1/reviews update review */
/*
* token need
* check if user have permission to udate card "admin or review owner"
*/
router.patch("/:id", (req, res) => {
  res.json({ data: "PUT /api/v1/reviews update review" });
});

/* /api/v1/reviews delete review */
/*
* token need
* check if user have permission to delete review "admin or review owner"
*/
router.delete("/:id", reviewController.deleteReview);

module.exports = router;

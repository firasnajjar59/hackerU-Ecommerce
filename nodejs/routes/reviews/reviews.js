const express = require("express");
const router = express.Router();
const reviewFunc=require("../../models/review")

/* /api/v1/reviews get all reviews */
/*
* no token need
*
*/
router.get("/", (req, res) => {
  res.json({ data: "GET /api/v1/reviews get all reviews" });
});
/* /api/v1/reviews/my-reviews get user reviews */
/*
* token need
*
*
*/
router.get("/:userId", (req, res) => {
  res.json({ data: "GET /api/v1/reviews/:userId get user reviews" });
});
/* /api/v1/reviews get one review */
/*
* no token need
*
*
*/
router.get("/review/:reviewId", (req, res) => {
  res.json({ data: "GET /api/v1/reviews/:reviewId get one review" });
});
/* /api/v1/reviews add review */
/*
* token need
*
*
*/
router.post("/", async (req, res) => {
  try {
    const review = await reviewFunc.createReviewDB(req.body)
    res.json({ review });
  } catch (error) {
    res.json({ error });
  }
});
/* /api/v1/reviews update review */
/*
* token need
* check if user have permission to udate card "admin or review owner"
*
*/
router.put("/:reviewId", (req, res) => {
  res.json({ data: "PUT /api/v1/reviews update review" });
});
/* /api/v1/reviews delete review */
/*
* token need
* check if user have permission to delete review "admin or review owner"
* 
*/
router.delete("/:reviewId", (req, res) => {
  res.json({ data: "DELETE /api/v1/reviews delete review" });
});

module.exports = router;

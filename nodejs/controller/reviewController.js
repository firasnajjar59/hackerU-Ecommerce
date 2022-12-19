const Reviews=require("../models/review")

const functionsFactory=require("./functionsFactory")


const createReview =  functionsFactory.createDocumant(Reviews)
const getAllReviews =  functionsFactory.getAllDocumants(Reviews)
const deleteReview =  functionsFactory.deleteDocumant(Reviews)
const getReviewByID =  functionsFactory.getDocumantByID(Reviews)
const getReviewsByUserID =  functionsFactory.getAllDocumantsByID(Reviews,"user_id")


module.exports={createReview,getAllReviews,deleteReview,getReviewByID,getReviewsByUserID}
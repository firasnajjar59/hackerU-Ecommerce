const express = require("express");
const router = express.Router();
const productFunc=require("../../models/product")
const checkRole=require("../../middlewares/cheackRole")

/* /api/v1/products get all products */
/*
* no token need
*
*/
router.get("/", (req, res) => {
  res.json({ data: "GET /api/v1/products get all products" });
});
/* /api/v1/products/my-products get user products */
/*
* token need
*
*
*/
router.get("/:userId",checkRole.user, async (req, res) => {
  try {
    if(req.headers.token){
      res.json({ data: "GET /api/v1/products/:userId get user products" });
    }else{
      throw "no Token"
    }
    
  } catch (error) {
    res.json({ error });
    
  }
});
/* /api/v1/products get one product */
/*
* no token need
*
*
*/
router.get("/product/:productId", (req, res) => {
  res.json({ data: "GET /api/v1/products/:productId get one product" });
});
/* /api/v1/products add product */
/*
* token need
*
*
*/
router.post("/", async (req, res) => {
  try {
    const product = await productFunc.createProductDB(req.body)
    res.json({ product });
  } catch (error) {
    res.json({ error });
  }
});
/* /api/v1/products update product */
/*
* token need
* check if user have permission to delete card "admin or card owner"
*
*/
router.put("/", (req, res) => {
  res.json({ data: "PUT /api/v1/products update product" });
});
/* /api/v1/products delete product */
/*
* token need
* check if user have permission to delete card "admin or card owner"
* 
*/
router.delete("/", (req, res) => {
  res.json({ data: "DELETE /api/v1/products delete product" });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const checkRole=require("../../middlewares/cheackRole")

/* /api/v1/admin */
/*
* 
*
*
*/
router.get('/',checkRole.admin, (req,res)=>{
    res.json({data:"GET /api/v1/admin"})
});
/* /api/v1/admin/:id get one user */
/*
* 
*
*
*/
router.get("/:id", (req, res) => {
    res.json({ data: "GET /api/v1/admin/:id get one admin" });
});
/* /api/v1/admin create admin */
/*
* 
*
*
*/
router.post('/', (req,res)=>{
    res.json({data:"POST /api/v1/admin create admin"})
});
/* /api/v1/admin update admin */
/*
* 
*
*
*/
router.put("/", (req, res) => {
    res.json({ data: "PUT /api/v1/admin update admin" });
});
/* /api/v1/admin delete admin */
/*
* 
*
*
*/
router.delete("/", (req, res) => {
    res.json({ data: "DELETE /api/v1/admin delete admin" });
});


/*
* 
*
*
*/
module.exports = router;

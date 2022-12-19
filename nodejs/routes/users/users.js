const express = require('express');
const router = express.Router();
const auth = require("../auth/auth")
const userFunc=require("../../models/user")

/* /api/v1/users */
/*
* 
*
*
*/
router.get('/', (req,res)=>{
    res.json({data:"GET /api/v1/users"})
});
/* /api/v1/users/:id get one user */
/*
* 
*
*
*/
router.get("/:id",async (req, res) => {

      res.json({ data: "GET /api/v1/users/:id get one user" });
    

});
/* /api/v1/users create user */
/*
* 
*
*
*/
router.post('/', async (req,res)=>{
  try {
    const user= await userFunc.createUserDB(req.body)
      res.json({user });
    
  } catch (error) {
    console.log(error);
    res.json({error})
  }
});
  /* /api/v1/users update user */
  /*
* 
*
*
*/
  router.put("/", (req, res) => {
    res.json({ data: "PUT /api/v1/users update user" });
  });
  /* /api/v1/users delete user */
  /*
* 
*
*
*/
  router.delete("/", (req, res) => {
    res.json({ data: "DELETE /api/v1/users delete user" });
  });
  /* /api/v1/users login user */
  /*
* 
*
*
*/
  router.use("/auth", auth );

module.exports = router;

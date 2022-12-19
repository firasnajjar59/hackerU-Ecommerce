const express = require("express");
const router = express.Router();

/* /api/v1/users/auth */
/*
 *
 *
 *
 */
router.post("/login", (req, res) => {
  res.setHeader("Token","admin");
  res.json({
    data: "GET /api/v1/users/auth/login login user",
    Token: "admin",
  });
});

module.exports = router;

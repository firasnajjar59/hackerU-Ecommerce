/** @format */

const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const authController = require('../controller/authController');
const generateToken = require('../middlewares/generateToken');
/* /api/v1/users/auth login user */

router.post('/login', authController.login, generateToken);

/* /api/v1/users/auth  create user */
router.post(
  '/signup',
  authController.deleteAdminRoleFromReq,
  authController.signup,
  generateToken
);

/* /api/v1/users/auth  forgot password */
router.post('/forgotpassword', authController.forgotPassword);

/* /api/v1/users/auth  reset password */
router.patch(
  '/resetpassword',
  authController.resrtPassword,
  generateToken
);

/* /api/v1/users/auth  update password */
router.patch(
  '/updatepassword',
  protect,
  authController.updatePassword,
  generateToken
);

module.exports = router;

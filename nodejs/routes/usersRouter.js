/** @format */

const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const checkIdInParams = require('../middlewares/checkIdInParams');
const userController = require('../controller/userController');
const protect = require('../middlewares/protect');
const { resizePhoto } = require('../middlewares/multer');
const permissionTo = require('../middlewares/permissionTo');
const generateToken = require('../middlewares/generateToken');
router.param('id', checkIdInParams);
/*
 * /api/v1/users nested router
 */
router.use('/auth', authRouter);
router.use('/admin', adminRouter);

// middleware to protect route only logged in user can access these routes
router.use(protect);
/*
 * /api/v1/users
 */
router.get('/', permissionTo('admin'), userController.getAllUsers);
router.route('/:id').get(userController.getUserById);
// * id from token
router.patch(
  '/updateme',
  userController.uploadUserPhoto,
  resizePhoto,
  userController.updateMe,
  generateToken
);

// * id from token
router.delete('/deleteme', userController.deleteMe);

module.exports = router;

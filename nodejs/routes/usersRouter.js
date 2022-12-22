/** @format */

const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const checkIdInParams = require('../middlewares/checkIdInParams');
const userController = require('../controller/userController');
const protect  = require('../middlewares/protect');
const { resizePhoto } = require('../middlewares/multer');
const permissionTo = require('../middlewares/permissionTo');
router.param('id', checkIdInParams);
/* /api/v1/users nested router */
/*
 *
 */
router.use('/auth', authRouter);
router.use('/admin',adminRouter);
router.use(protect)
/* /api/v1/users */
/*
 *
 */
router.get('/', permissionTo('admin'), userController.getAllUsers);
/* /api/v1/users/:id get one user */
/*
 *
 */
router
  .route('/:id')
  .get(userController.getUserById)
  .delete(permissionTo('admin'),userController.deletUser);
/* /api/v1/users update user */
/*
 *
 */
router.patch(
  '/updateme',
  userController.uploadUserPhoto,
  resizePhoto,
  userController.updateMe
);
/* /api/v1/users update user */
/*
 *
 */
router.delete('/deleteme',  userController.deleteMe);



module.exports = router;

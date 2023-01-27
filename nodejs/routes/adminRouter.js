/** @format */

const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const protect = require('../middlewares/protect');
const permissionTo = require('../middlewares/permissionTo');
const webContentRouter = require('./webContentRouter');
const generateToken = require('../middlewares/generateToken');
const AppError = require('../utils/appError');
// middlewares
router.use('/webcontent', webContentRouter);
router.use(protect);
router.use(permissionTo('admin'));
//* nested route api/v1/users/admin/webcontent


/*
 * api/v1/users/admin
 */
router.route('/').get((req,res,next)=>{
  return next(new AppError('Route not defined yet',400))
}).post(adminController.createAdmin,generateToken);

router
  .route('/:id')
  .patch(
   adminController.updateUser,generateToken
  )
  .delete(adminController.deletUser);

module.exports = router;

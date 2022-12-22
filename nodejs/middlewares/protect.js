/** @format */

const AppError = require('../utils/appError');
const catchAsync = require('../services/catchAsync');
const { verifyToken } = require('../config/jwt');
const Users = require('../models/userModel');

const protect = catchAsync(async (req, res, next) => {
  let token;
  // if token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //
  if (!token) {
    return next(
      new AppError('Your are not logged in. Please log in to get acces', 401)
    );
  }
  // validate token
  const decoded = await verifyToken(token);
  // if user exists
  const user = await Users.findById(decoded.id).select('+password');
  if (!user) {
    return next(new AppError('The user no longer exist', 401));
  }
  // if user change password after the token exist
  const isChanged = user.changedPasswordAfter(decoded.iat);
  if (isChanged) {
    return next(new AppError('Invalid token please login again', 401));
  }
  req.doc = user;
  next();
});

module.exports = protect;

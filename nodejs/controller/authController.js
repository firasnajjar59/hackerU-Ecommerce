/** @format */
const crypto = require('crypto');

const Users = require('../models/userModel');
const AppError = require('../utils/appError');
const { compareHash } = require('../config/bcrypt');
const catchAsync = require('../services/catchAsync');
const functionsFactory = require('../services/functionsFactory');
const sendEmail = require('../services/email');
//
const signup = functionsFactory.createDocumant(Users);
//
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check if client provid an email and password
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // check if there is a user with provided email
  const user = await Users.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }
  // check if the password is the same for user in database
  const isEquel = await compareHash(password, user.password);
  if (!isEquel) {
    next(new AppError('Incorrect email or password', 401));
  }
  req.doc = user;
  //
  next();
});
//
const forgotPassword = catchAsync(async (req, res, next) => {
  // cheack if user provid an email
  if (!req.body.email) {
    return next(new AppError('Please send email.', 404));
  }

  // get user based on email
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }
  // generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save();
  // send token to user's email
  //   build a url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/auth/resetpassword/${resetToken}`;
  //   build a email message
  const message = `Submit a PATCH request with your new password to: ${resetUrl}.\nIf you didn't forget your password,please ignore this email!`;
  // send response
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token valid for 10 min',
      message,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
  //   response
  res.status(200).json({
    status: 'success',
    data: {
      message:
        'A link to reset your password was sent by email. Please check your email',
    },
  });
});
//
const resrtPassword = catchAsync(async (req, res, next) => {
  // get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await Users.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('Token is invalid or expired', 400));
  }
  // if token has not expired and there is user so set new password
  // update passwordChangedAt property for the user
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // log the user in send JWT
  req.doc = user;
  next();
});
//
const updatePassword = catchAsync(async (req, res, next) => {
  // need to check if password in req body is correct
  const isEquel = await compareHash(req.body.password, req.doc.password);
  if (!isEquel) return next(new AppError('Incorrect password', 401));
  // if correct so update password
  req.doc.password = req.body.newPassword;
  await req.doc.save();
  // log user in send JWT
  next();
});
//
const deleteAdminRoleFromReq = (req, res, next) => {
  if (req.body.role == 'admin') {
    req.body.role = 'user';
  }
  next();
};
module.exports = {
  login,
  signup,
  forgotPassword,
  resrtPassword,
  updatePassword,
  deleteAdminRoleFromReq,
};

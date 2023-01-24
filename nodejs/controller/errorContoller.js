/** @format */
const AppError = require('../utils/appError');

// * handle mongo IdObject Error
const handleCastError = err => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};
// * handle JWT invalid signature
const handleJsonWebTokenError = () =>
  new AppError('Invalid token please login again', 401);
// * handle JWT Token Expired Error
const handleTokenExpiredError = () =>
  new AppError('Your token has expired please login again', 401);
// * handle mongo validation Error
const handleValidatorError = err => {
  const message = `${err.message}`;
  return new AppError(message, 400);
};
// * handle duplicated field in mongo
const handleDuplicateField = err => {
  const message = `Duplicaute field value ${JSON.stringify(
    Object.keys(err.keyValue)[0]
  ).replaceAll('"', '')}`;
  console.log(message);
  return new AppError(message, 400);
};
// * handling Errors for development Envirment
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack,
  });
};
// * handling Errors for production Envirment
const sendErrorProd = (err, res) => {
  /*
   * operational error
   * this error pass throw our AppError class and get the 'isOperational'
   * so we handle this error in the class, and we can send it to the client
   */
  if (err.isOperational) {
    // send the error
    // console.log(err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    /* 
    !  this Error didn't pass throw our AppError
    !  so we don't know what caused for this error
    !  unkown error. this why we send a generic message
    */
  } else {
    //? log error
    console.log('Error', err);
    //? generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

/*
 * the errorController: handling which envirment we are
 * and execute relivant function
 * also in production envirment cheack if the Error caused by mongo
 * if yes then muniplate the error object and send it at the response
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'production') {

    console.log("78",err);
    if (err.name === 'CastError') err = handleCastError(err);
    if (err.code === 11000) err = handleDuplicateField(err);
    if (err.name === 'ValidationError') err = handleValidatorError(err);
    if (err.name === 'JsonWebTokenError') err = handleJsonWebTokenError();
    if (err.name === 'TokenExpiredError') err = handleTokenExpiredError();
    sendErrorProd(err, res);
  } else if (process.env.NODE_ENV === 'development') {
    if (err.name === 'CastError') err = handleCastError(err);
    if (err.code === 11000) err = handleDuplicateField(err);
    if (err.name === 'ValidationError') err = handleValidatorError(err);
    if (err.name === 'JsonWebTokenError') err = handleJsonWebTokenError();
    if (err.name === 'TokenExpiredError') err = handleTokenExpiredError();
    sendErrorDev(err, res);
  }
};

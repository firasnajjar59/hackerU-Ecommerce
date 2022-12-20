/** @format */
const AppError = require('../utils/appError');

// * handle mongo IdObject Error
const handleCastError = err => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};
// * handle mongo validation Error
const handleValidatorError = err => {
  const message = `${err.message}`;
  return new AppError(message, 400);
};
// * handle duplicated field in mongo
const handleDuplicateField = err => {
  const message = `Duplicaute field value ${JSON.stringify(
    err.keyValue
  ).replaceAll('"', '')}`;
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
    let error = JSON.parse(JSON.stringify(err));
    console.log(error);
    if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateField(error);
    if (error.name === "ValidationError") error = handleValidatorError(error);
    sendErrorProd(error, res);
  } else if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
};

/** @format */

const catchAsync = require('../services/catchAsync');
const AppError = require('../utils/appError');
const functionsFactory = require('../services/functionsFactory');
const sendEmail = require('../services/email');

//
const sendEmailToCustemer = catchAsync(async (req, res, next) => {
  if (
    req.body.email.length > 0 &&
    req.body.message.length > 0 &&
    req.body.subject.length > 0
  ) {
    console.log(req.body);
    const data = await sendEmail({
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      html: `
      <!DOCTYPE html>
      <html dir="ltr" lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            http-equiv="X-UA-Compatible"
            content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body dir="ltr" id="body" style="display: flex; justify-content: center; align-items: center; width: 100%; min-height: 20rem; position: relative;">
          <div style="margin: auto; width: 50%; min-height: 5rem; border: 3px solid #2a7c6f; padding: 3rem; box-sizing: border-box; background-color: #f9f9f9;" class="wrapper">
              <h1 style="color:#2a7c6f;">${req.body.subject}</h1>
              <p style="color: #2a7c6f; font-size: 1.3rem;">${req.body.message}</p>
          </div>
        </body>
      </html> `,
    });

    res.status(200).json({ message: 'emails sent' });
  } else {
    next(new AppError('Please fill the fields subject and message', 400));
  }
});

module.exports = {
  sendEmailToCustemer,
};

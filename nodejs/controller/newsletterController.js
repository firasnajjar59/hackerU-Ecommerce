const NewsLetter = require("../models/newsLetterModel");
const catchAsync = require("../services/catchAsync");
const AppError = require('../utils/appError');
const functionsFactory = require('../services/functionsFactory');
const sendEmail = require("../services/email");

// 
const getAllEmails=functionsFactory.getAllDocumantsNOQuery(NewsLetter)
// 
const postEmail=functionsFactory.createDocumant(NewsLetter)
// 
const sendNewsletter=catchAsync(async(req,res,next)=>{
  if(req.body.emails.length>0&&req.body.message.length>0&&req.body.subject.length>0){
    await Promise.all(req.body.emails.map(async (email)=>{
        await sendEmail({
              email: email,
              subject: req.body.subject,
              message:req.body.message,
            })
       
          }
          ))
          res.status(200).json({message:"emails sent"})
  }else{
    next(new AppError('Please fill the fields subject and message',400))
  }
})

module.exports = {
    postEmail,
    getAllEmails,
    sendNewsletter
  };
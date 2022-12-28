const WebContent = require("../models/webContentModel")
const functionsFactory = require('../services/functionsFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../services/catchAsync');
const { upload } = require('../middlewares/multer');

const getAllContent = functionsFactory.getAllDocumants(WebContent);
const createContent = functionsFactory.createDocumant(WebContent);
const editContent = catchAsync(async (req,res,next)=>{
  let content= await WebContent.findOne({name:req.body.name})
  if (!content)return next(new AppError("No content belong this name found.",404))
  content.content=req.body.content;
  content.save()
  res.status(200).json({ status: 'success', data: content })
})
const deleteContent = catchAsync(async (req,res,next)=>{
  await WebContent.findOneAndDelete({name:req.body.name})

  res.status(200).json({ status: 'success' })
})

module.exports = {
    getAllContent,
    createContent,
    editContent,
    deleteContent
  };
  


/** @format */

const WebContent = require('../models/webContentModel');
const functionsFactory = require('../services/functionsFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../services/catchAsync');
const { upload } = require('../middlewares/multer');

const uploadContentPhoto = upload.single('img');
const uploadContentPhotos = upload.array('imgs');
const getAllContent = functionsFactory.getAllDocumants(WebContent);
const getContent = functionsFactory.getAllDocumantsNOQuery(WebContent);
const createContent = catchAsync(async (req, res, next) => {
  console.log('controller');

  if (req.file) req.body.img = req.file.filename;
  // update user document
  const content = await WebContent.create(req.body);
  console.log(content);
  res.status(201).json({ status: 'success', data: content });
});
const editContent = catchAsync(async (req, res, next) => {
  let content = await WebContent.findOne({ name: req.body.name });
  if (!content)
    return next(new AppError('No content belong this name found.', 404));
  if (req.body.img) content.img = req.body.img;
  if (req.body.imgs) content.imgs = req.body.imgs;
  if (req.body.content) content.content = req.body.content;
  content.save();
  res.status(200).json({ status: 'success', data: content });
});
const editMultiContent = catchAsync(async (req, res, next) => {
  let content = await WebContent.findOne({ name: req.body.name });
  if (!content)
    return next(new AppError('No content belong this name found.', 404));
  if (req.body.img) content.img = req.body.img;
  if (req.body.imgs) {
    content.imgs.push(...req.body.imgs);
  }
  if (req.body.content) content.content = req.body.content;
  content.save();
  res.status(200).json({ status: 'success', data: content });
});
const deleteContent = catchAsync(async (req, res, next) => {
  await WebContent.findOneAndDelete({ name: req.body.name });

  res.status(200).json({ status: 'success' });
});
const nameFromParamToBody=(req,res,next)=>{
  req.body.name=req.params.name
  next()
}

module.exports = {
  getAllContent,
  createContent,
  editContent,
  deleteContent,
  uploadContentPhoto,
  uploadContentPhotos,
  editMultiContent,
  getContent,
  nameFromParamToBody
};

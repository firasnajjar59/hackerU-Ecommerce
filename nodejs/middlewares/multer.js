/** @format */

const multer = require('multer');
const AppError = require('../utils/appError');
const sharp = require('sharp');
const catchAsync = require('../services/catchAsync');

// const multerStorge = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/images/users')
//     },
//     filename:(req,file,cb)=>{
//         const ext =file.mimetype.split('/')[1]
//         cb(null,`user-${req.doc._id}-${Date.now()}.${ext}`)
//     }
// })
const multerStorge = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else
    cb(new AppError('Not an image! please upload images only', 400), false);
};




const resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.doc._id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);
  next();
});


const resizeMultiPhotos = catchAsync(async (req, res, next) => {
  if (!req.files.length>0) return next();
  console.log(req.files);
  req.body.imgs=[]
  await Promise.all(req.files.map(async (file,i)=>{
    const filename = `user-${req.doc._id}-${Date.now()}-${i+1}.jpeg`;
    await sharp(file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/images/products/${filename}`);
      req.body.imgs.push(filename)
    }))
    console.log(req);
  next();
});

const upload = multer({
  storage: multerStorge,
  fileFilter: multerFilter,
});

module.exports = {
  upload,
  resizePhoto,
  resizeMultiPhotos
};

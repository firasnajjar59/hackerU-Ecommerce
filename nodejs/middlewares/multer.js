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
    console.log("hi");
    cb(null, true);
  } else
    cb(new AppError('Not an image! please upload images only', 400), false);
};




const resizePhoto = (name)=>catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `${name}-${req.doc._id}-${Date.now()}.png`;
  await sharp(req.file.buffer)
    .resize(500, 500,{fit:"contain",background: { r: 255, g: 255, b: 255, alpha: 0 }})
    .toFormat('png')
    .png({ quality: 90 })
    .toFile(`public/images/${name}/${req.file.filename}`);
  next();
});


const resizeMultiPhotos =(name)=> catchAsync(async (req, res, next) => { 
  if (!req.files||req.files.length==0) return next();
  req.body.imgs=[]
  await Promise.all(req.files.map(async (file,i)=>{
    const filename = `${name}-${req.doc._id}-${Date.now()}-${i+1}.png`;
    await sharp(file.buffer)
      .resize(500, 500,{fit:"contain",background: { r: 255, g: 255, b: 255, alpha: 0 }})
      .toFormat('png')
      .png({ quality: 90 })
      .toFile(`public/images/${name}/${filename}`);
      req.body.imgs.push(filename)
    }))
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

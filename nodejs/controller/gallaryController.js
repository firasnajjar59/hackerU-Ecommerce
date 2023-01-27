const Gallary = require("../models/gallaryModel");
const catchAsync = require("../services/catchAsync");
const functionsFactory = require('../services/functionsFactory');
const { upload } = require("../middlewares/multer");

const uploadGallaryImg = upload.single('img');
const getImgs=functionsFactory.getAllDocumantsNOQuery(Gallary);
const createImg = catchAsync(async (req, res, next) => {
    if (req.file) req.body.img = req.file.filename;
    // update user document
    const img = await Gallary.create(req.body);
    res.status(201).json({ status: 'success', data: img });
  });

module.exports = {
    getImgs,
    uploadGallaryImg,
    createImg
  };
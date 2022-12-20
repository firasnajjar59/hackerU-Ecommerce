/** @format */
const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


//*
exports.getAllDocumants = Model =>
  catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();
    const doc = await features.query;
    if (!doc.length) {
      return next(new AppError('document not found', 404));
    }
    res.json({status:"success", result: doc.length, doc });
  });
//*
exports.createDocumant = Model =>
  catchAsync(async (req, res, next) => {
    let doc = new Model(req.body);
    doc = await doc.save();
    res.status(201).json({status:"success", doc });
  });
//*
exports.getAllDocumantsByID = (Model, key) =>
  catchAsync(async (req, res, next) => {
    let filterOption = {};
    filterOption[key] = req.params.id;
    const doc = await Model.find(filterOption);
    // if (!doc.length) {
    //   return next(new AppError('document not found', 404));
    // }
    res.json({status:"success", result: doc.length, doc });
  });
//*
exports.updateDocumantByID = (Model, key) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('document not found', 404));
    }
    res.json({ status:"success", doc });
  });
//*
exports.getDocumantByID = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError('document not found', 404));
    }
    res.json({status:"success", doc });
  });
//*
exports.deleteDocumant = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('document not found', 404));
    }
    res.json({status:"success", doc });
  });

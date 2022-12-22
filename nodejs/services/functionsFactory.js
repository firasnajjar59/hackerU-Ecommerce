/** @format */
const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('./catchAsync');
const AppError = require('../utils/appError');

//*
exports.getAllDocumants = Model =>
  catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();
    let skip = features.skip;
    let limit = features.limit;
    const doc = await features.query;
    if (!doc.length) {
      return next(new AppError('document not found', 404));
    }
    res.json({
      status: 'success',
      info: {
        result: doc.length,
        previous:
          skip / limit
            ? `${req.protocol}://${req.host}:${8000}${req.baseUrl}?page=${
                skip / limit
              }&limit=${limit}`
            : null,
        next: `${req.protocol}://${req.hostname}:${8000}${req.baseUrl}?page=${
          (skip + 2 * limit) / limit
        }&limit=${limit}`,
      },
      data: { doc },
    });
  });

//*
exports.createDocumant = Model =>
  catchAsync(async (req, res, next) => {
    let doc = new Model(req.body);
    doc = await doc.save();
    console.log(doc.email);
    // check if we create a user if yes we pass to next middleware
    // that generat a token and send it to the client
    if (doc.email) {
      req.doc = doc;
      return next();
    }

    res.status(201).json({ status: 'success', data: { doc } });
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
    res.json({ status: 'success', result: doc.length, data: { doc } });
  });
//*
exports.updateDocumantByID = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('document not found', 404));
    }
    res.json({ status: 'success', data: { doc } });
  });
//*
exports.getDocumantByID = Model =>
  catchAsync(async (req, res, next) => {
    console.log(req.params);
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError('document not found', 404));
    }
    res.json({ status: 'success', doc });
  });
//*
exports.deleteDocumant = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('document not found', 404));
    }
    res.json({ status: 'success', doc });
  });

/** @format */
const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('./catchAsync');
const AppError = require('../utils/appError');

//* this function accept a mongoose model then it is find all the documents
//* this function use class that we build for chain function like:
//* filter, sort, fields and pagination
//* the parameters for all of the function the class get them from the req query and
//* and manipulate them and return the relevant documents 
//* and after we await the query we check if there is no document if it's true so
//* the function return error with 404
//* if there is document so we send success respones with the relevant document
exports.getAllDocumants = Model =>
  catchAsync(async (req, res, next) => {
    const docNumber=await Model.countDocuments({})
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
      docsInDB:docNumber,
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
exports.getAllDocumantsNOQuery = Model =>
catchAsync(async (req, res, next) => {
    const doc=await Model.find(req.body)
if (!doc.length) {
  return next(new AppError('document not found', 404));
}
console.log(doc);

    res.json({
      status: 'success',
      data: { doc },
    });
  });

//* this function accept a mongoose model then it is build new document from the 
//* req.body belong the schema we pass then save it to database
//* then check if the document we create is a user if it is the condition return next
//* and we move to the next function to generate token if is not user the function
//* send success response
exports.createDocumant = Model =>
  catchAsync(async (req, res, next) => {
    let doc = new Model(req.body);
    doc = await doc.save();
    // check if we create a user if yes we pass to next middleware
    // that generat a token and send it to the client
    if (doc.email) {
      req.doc = doc;
      return next();
    }

    res.status(201).json({ status: 'success', data: { doc } });
  });

//* this function accept a mongoose model and the name of id field then pass the id 
//* from the req.param and find all the document belong this id
//* then check if there is no documents belong this id if it's true the condition 
//* return next and error object with error code 404, if is false the function
//* send success response
exports.getAllDocumantsByID = (Model, key) =>
  catchAsync(async (req, res, next) => {
    let filterOption = {};
    filterOption[key] = req.params.id;
    const doc = await Model.find(filterOption);
    if (!doc.length) {
      res.json({ status: 'success', result: doc.length, doc:[] });
    }
    res.json({ status: 'success', result: doc.length, doc  });
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
    if (doc.email) {
      req.doc = doc;
      return next();
    }
    res.json({ status: 'success', data: { doc } });
  });

//*
exports.getDocumantByID = Model =>
  catchAsync(async (req, res, next) => {
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

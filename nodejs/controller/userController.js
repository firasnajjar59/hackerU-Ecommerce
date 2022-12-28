/** @format */

const Users = require('../models/userModel');
const functionsFactory = require('../services/functionsFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../services/catchAsync');
const filterObj = require('../utils/checkIfObjHaveKeys');
const { upload } = require('../middlewares/multer');

const uploadUserPhoto = upload.single('photo');
const getAllUsers = functionsFactory.getAllDocumants(Users);
const getUserById = functionsFactory.getDocumantByID(Users);

const updateMe = catchAsync(async (req, res, next) => {
  // error if user try to update password
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError("You can't update password", 400));
  //filter update values before update
  const filteredBody = filterObj(req.body, 'name', 'email', 'phone');
  if (req.file) filteredBody.userImg = req.file.filename;
  // update user document
  const user = await Users.findByIdAndUpdate(req.doc._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  // response
 next()
});
const deleteMe = catchAsync(async (req, res, next) => {
  // update the field activeUser
  await Users.findByIdAndUpdate(req.doc._id, { activeUser: false });
  // response
  res.status(204).json({
    status: 'success',
    message: 'User deleted',
  });
});

module.exports = {
  getAllUsers,
  updateMe,
  deleteMe,
  getUserById,
  uploadUserPhoto,
};

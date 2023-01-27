/** @format */

const { generateJWTToken } = require('../config/jwt');
const catchAsync = require('../services/catchAsync');
const generateToken = catchAsync(async (req, res, next) => {
  const token = await generateJWTToken({
    id: req.doc._id,
    name: req.doc.name,
    email: req.doc.email,
    userName: req.doc.userName,
    cart: req.doc.cart,
    order: req.doc.order,
    wishlist: req.doc.wishlist,
    role: req.doc.role,
    phone: req.doc.phone,
    userImg: req.doc.userImg,
    birthday:req.doc.birthday
  });
  res.status(200).json({ status: 'success', data: { token } });
});

module.exports = generateToken;

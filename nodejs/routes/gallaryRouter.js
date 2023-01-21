/** @format */

const express = require('express');
const router = express.Router();
const gallaryController = require('../controller/gallaryController');
const { resizePhoto } = require('../middlewares/multer');
const protect = require('../middlewares/protect');
const permissionTo = require('../middlewares/permissionTo');

router
  .route('/')
  .get(
    gallaryController.getImgs
  ).post(protect,permissionTo("admin", 'contributor') ,gallaryController.uploadGallaryImg,resizePhoto("gallary"),gallaryController.createImg);
  module.exports = router;
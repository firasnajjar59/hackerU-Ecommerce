/** @format */

const express = require('express');
const router = express.Router();
const WebContentController = require('../controller/webContentController');
const { resizePhoto, resizeMultiPhotos } = require('../middlewares/multer');
const protect=require("../middlewares/protect")
const permissionTo=require("../middlewares/permissionTo")
// middlewares

router
  .route('/')
  .get(WebContentController.getAllContent)
  .post(
    protect,permissionTo('admin'),
    WebContentController.uploadContentPhoto,
    resizePhoto("content"),
    WebContentController.createContent
  )
  .patch(
    protect,permissionTo('admin', 'contributor'),
    WebContentController.uploadContentPhoto,
    resizePhoto("content"),
    WebContentController.editContent
  )
  .delete(protect,permissionTo('admin', 'contributor'),WebContentController.deleteContent);
  // 
  router.route("/multi").post(
    protect,permissionTo('admin', 'contributor'),
    WebContentController.uploadContentPhotos,
    resizeMultiPhotos("content"),
    WebContentController.createContent
  )
  .patch(
    protect,permissionTo('admin', 'contributor'),
    WebContentController.uploadContentPhotos,
    resizeMultiPhotos("content"),
    WebContentController.editMultiContent
  )
  router
  .route('/:name').get(WebContentController.nameFromParamToBody,WebContentController.getContent)

module.exports = router;

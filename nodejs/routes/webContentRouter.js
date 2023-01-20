/** @format */

const express = require('express');
const router = express.Router();
const WebContentController = require('../controller/webContentController');
const { resizePhoto, resizeMultiPhotos } = require('../middlewares/multer');
// middlewares

router
  .route('/')
  .get(WebContentController.getAllContent)
  .post(
    WebContentController.uploadContentPhoto,
    resizePhoto("content"),
    WebContentController.createContent
  )
  .patch(
    WebContentController.uploadContentPhoto,
    // WebContentController.uploadContentPhotos,
    resizePhoto("content"),
    // resizeMultiPhotos("content"),
    WebContentController.editContent
  )
  .delete(WebContentController.deleteContent);
  // 
  router.route("/multi").post(
    WebContentController.uploadContentPhotos,
    resizeMultiPhotos("content"),
    WebContentController.createContent
  )
  .patch(
    WebContentController.uploadContentPhotos,
    resizeMultiPhotos("content"),
    WebContentController.editMultiContent
  )
  router
  .route('/:name').get(WebContentController.nameFromParamToBody,WebContentController.getContent)

module.exports = router;

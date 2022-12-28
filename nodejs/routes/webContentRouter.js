/** @format */

const express = require('express');
const router = express.Router();
const WebContentController = require('../controller/webContentController');
// middlewares

router
  .route('/')
  .get(WebContentController.getAllContent)
  .post(WebContentController.createContent)
  .patch(WebContentController.editContent)
  .delete(WebContentController.deleteContent);

module.exports = router;

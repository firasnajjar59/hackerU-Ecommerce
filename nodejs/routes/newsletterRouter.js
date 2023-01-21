/** @format */

const express = require('express');
const router = express.Router();
const newsletterController = require('../controller/newsletterController');
const protect = require('../middlewares/protect');
const permissionTo = require('../middlewares/permissionTo');

router
  .route('/')
  .get(protect, permissionTo('admin', 'contributor'), newsletterController.getAllEmails)
  .post(
    newsletterController.postEmail
  );
router
  .route('/sendemails')
  .post(
    newsletterController.sendNewsletter
  );
module.exports = router;

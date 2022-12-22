/** @format */

const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const protect= require('../middlewares/protect');
const permissionTo = require('../middlewares/permissionTo');

// middlewares
router.use(protect)
router.use(permissionTo('admin'))


/* /api/v1/admin */
/*
 *
 *
 *
 */
router
  .route('/')
  .get((req, res) => {
    res.json({ data: 'GET /api/v1/admin' });
  })
  .post((req, res) => {
    res.json({ data: 'POST /api/v1/admin create admin' });
  });
/* /api/v1/admin/:id get one user */
/*
 *
 *
 *
 */
router
  .route('/:id')
  .get((req, res) => {
    res.json({ data: 'GET /api/v1/admin/:id get one admin' });
  })
  .patch( (req, res) => {
    res.json({ data: 'PUT /api/v1/admin update admin' });
  })
  .delete( (req, res) => {
    res.json({ data: 'DELETE /api/v1/admin delete admin' });
  });

module.exports = router;

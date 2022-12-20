/** @format */

const express = require('express');
const router = express.Router();
const auth = require('./authRouter');
const checkIdInParams = require('../middlewares/checkIdInParams');
const userController = require('../controller/userController');

router.param('id', checkIdInParams);

/* /api/v1/users */
/*
 *
 *
 *
 */
router.get('/', userController.getAllUsers);

/* /api/v1/users/:id get one user */
/*
 *
 *
 *
 */
router.get('/:id', async (req, res) => {
  res.json({ data: 'GET /api/v1/users/:id get one user' });
});

/* /api/v1/users create user */
/*
 *
 *
 *
 */
router.post('/', userController.createUser);

/* /api/v1/users update user */
/*
 *
 *
 *
 */

router.patch('/', (req, res) => {
  res.json({ data: 'PUT /api/v1/users update user' });
});
/* /api/v1/users delete user */
/*
 *
 *
 *
 */
router.delete('/:id', userController.deletUser);

/* /api/v1/users login user */
/*
 *
 *
 *
 */
router.use('/auth', auth);

module.exports = router;

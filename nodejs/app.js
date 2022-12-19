/** @format */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const requestedAt = require('./middlewares/requestedAt');
const checkIdInParams = require('./middlewares/checkIdInParams');

const apiRouter = require('./routes/api');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(requestedAt);
app.use(mongoSanitize());
// app.use(express.static(path.join(__dirname, 'public')));

app.param('id', checkIdInParams);
app.use('/api/v1', apiRouter);

module.exports = app;

/** @format */

import Joi from 'joi-browser';

const resetPasswordSchema = {
  token: Joi.string().min(6).max(6).required().label('token'),
  password: Joi.string().min(8).max(100).required().label('password'),
  passwordConfirm: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .label('passwordConfirm'),
};

export default resetPasswordSchema;

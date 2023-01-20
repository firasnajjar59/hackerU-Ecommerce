/** @format */

import Joi from 'joi-browser';
const registerSchema = {
  name: Joi.string().min(2).max(50).required().label('name'),
  email: Joi.string().email().min(6).max(1024).required().label('email'),
  password: Joi.string().min(8).max(20).required().label('password'),
  userName: Joi.string().min(2).max(10).required().label('userName'),
  passwordConfirm: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .label('passwordConfirm'),
  phone: Joi
    .string()
    .regex(/^[0-9]{10}$/)
    .required().label('phone'),
  address: Joi
  .string().label('address'),
  birthday:Joi.date().label('birthday'),
};
export default registerSchema;

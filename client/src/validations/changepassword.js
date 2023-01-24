import Joi from "joi-browser";

  const changePassword={
    password: Joi.string().min(8).max(100).required().label("password"),
    newPassword: Joi.string().min(8).max(100).required().label("password"),
    confirmNewPassword: Joi.any()
    .valid(Joi.ref('newPassword'))
    .required()
    .label('passwordConfirm'),
  }

export default changePassword
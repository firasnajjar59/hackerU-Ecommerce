import Joi from "joi-browser";

  const emailSchema={
    email: Joi.string().email().min(6).max(1024).required().label("email"),
  }

export default emailSchema
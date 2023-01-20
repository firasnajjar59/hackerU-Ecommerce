import Joi from "joi-browser";

  const cardSchema={
    title: Joi.string().min(2).max(256).required().label("title"),
    subTitle: Joi.string().min(2).max(256).required().label("subTitle"),
    description: Joi.string().min(2).max(1024).required().label("description"),
    address: Joi.string().min(2).max(256).required().label("address"),
    phone: Joi.string().min(9).max(14).required().label("phone"),
    url: Joi.string().min(6).max(1024).label("url"),
    alt: Joi.string().min(2).max(256).label("alt"),
  }

export default cardSchema
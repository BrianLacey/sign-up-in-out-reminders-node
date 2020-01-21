const Joi = require("@hapi/joi");

const registerSchema = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().min(8).required(),
  userName: Joi.string()
    .alphanum()
    .required(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/, "numbers").required(),
  createdDate: Joi.date().default(() => new Date()),
  updatedDate: Joi.date().default(() => new Date())
};

const signInSchema = {
  password: Joi.string().required(),
  userName: Joi.string().alphanum(),
  email: Joi.string().email()
};

module.exports = {
  registerSchema: Joi.object().keys(registerSchema),
  signInSchema: Joi.object()
    .keys(signInSchema)
    .xor("userName", "email")
};

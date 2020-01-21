const Joi = require("@hapi/joi");

const reminderSchema = {
  date: Joi.date()
    .iso()
    .required(),
  content: Joi.string().required(),
  userId: Joi.string().alphanum().length(24),
  smsNotifications: Joi.bool().required(),
  emailNotifications: Joi.bool().required(),
  createdDate: Joi.date().default(() => new Date()),
  updatedDate: Joi.date().default(() => new Date())
};

module.exports = { reminderSchema: Joi.object().keys(reminderSchema) };

const router = require("express").Router();
const remindersController = require("../controllers/reminders.controllers.js");
const reminder = require("../models/reminders.models.js");
const validateBody = require("../helpers/validate.js");
const authenticate = require("../helpers/authenticate.js");

// Auth Routes
router.use(authenticate);
router.post(
  "/create",
  validateBody(reminder.reminderSchema),
  remindersController.createReminder
);

module.exports = router;

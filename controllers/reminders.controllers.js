const reminderService = require("../services/reminders.service.js");
const reminderManagers = require("../managers/reminderManagers.js");

module.exports = {
  createReminder: createReminder
};

function createReminder(req, res) {
  req.model.userId = reminderManagers.getUserId(req);
  reminderManagers.newReminderCronJob(req.model);
  reminderService
    .createReminder(req.model)
    .then(res.status(201).send("Reminder created!"))
    .catch(err => res.status(400).json(err.message));
}

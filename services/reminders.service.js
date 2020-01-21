const db = require("../mongodb.js").db;
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  createReminder: createReminder,
  readAllRemindersByUser: readAllRemindersByUser
};

function createReminder(model) {
  return db()
    .collection("reminders")
    .insertOne(model)
    .then(result => result.insertedId.toString());
}

function readAllRemindersByUser(id) {
  return db()
    .collection("reminders")
    .find({ userId: id })
    .toArray()
    .then(result => {
      const stringIdResult = result.map(entry => {
        entry._id = entry._id.toString();
        return entry;
      });
      return stringIdResult;
    });
}

const jwt = require("jsonwebtoken");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio");
const twilioClient = new twilio(accountSid, authToken);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const CronJob = require("cron").CronJob;
const userService = require("../services/users.service");
const userManagers = require("../managers/userManagers");
const reminderService = require("../services/reminders.service");

module.exports = {
  getUserId: getUserId,
  sendSMSReminder: sendSMSReminder,
  sendEmailReminder: sendEmailReminder,
  reminderDataObject: reminderDataObject,
  newReminderCronJob: newReminderCronJob,
  dbRemindersCronjobs: dbRemindersCronjobs
};

function getUserId(req) {
  const token = req.cookies.Auth;

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decoded.id;
}

function sendSMSReminder(data) {
  twilioClient.messages
    .create({
      body: data.content,
      to: data.phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    })
    .then(message => {
      console.log(message.sid);
      res.status(200).send("Success!");
    })
    .catch(err => {
      res.status(400).json(err.message);
    });
}

function sendEmailReminder(data) {
  const msg = {
    to: data.email,
    from: "set@mailinator.com",
    subject: "TESTING EMAIL",
    text: data.content,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  sgMail.send(msg).then(result => {
    res
      .status(200)
      .send("Successful email!")
      .catch(err => {
        res.status(400).json(err.message);
      });
  });
}

function reminderDataObject(data) {
  const reminder = {
    reminderId: data._id,
    date: data.date,
    content: data.content,
    smsNotifications: data.smsNotifications,
    emailNotifications: data.emailNotifications,
    userId: data.userId
  };
  return reminder;
}

async function newReminderCronJob(reminderModel) {
  const userData = await userService.readUserById(reminderModel.userId);
  const user = userManagers.userDataObject(userData);
  const userAndReminderData = {
    userId: user.id,
    userName: user.userName,
    pnoneNumber: user.phoneNumber,
    email: user.email,
    date: reminderModel.date,
    content: reminderModel.content,
    smsNotifications: reminderModel.smsNotifications,
    emailNotifications: reminderModel.emailNotifications
  };
  if (userAndReminderData.smsNotifications) {
    const job = new CronJob(userAndReminderData.date, () =>
      sendSMSReminder(userAndReminderData)
    );
    job.start();
  }
  if (userAndReminderData.emailNotifications) {
    const job = new CronJob(userAndReminderData.date, () =>
      sendEmailReminder(userAndReminderData)
    );
    job.start();
  }
}

async function dbRemindersCronjobs(id) {
  const userData = await userService.readUserById(id);
  const user = userManagers.userDataObject(userData);
  delete user.id;
  const userReminderData = await reminderService.readAllRemindersByUser(id);
  const userReminders = userReminderData.map(entry => {
    return (entry = reminderDataObject(entry));
  });
  const userAndReminderData = userReminders.map(reminderObj => {
    return Object.assign({}, reminderObj, user);
  });
  for (let i = 0; i < userAndReminderData.length; i++) {
    if (userAndReminderData[i].smsNotifications) {
      const job = new CronJob(userAndReminderData[i].date, () =>
        sendSMSReminder(userAndReminderData[i])
      );
      job.start();
    }
    if (userAndReminderData[i].emailNotifications) {
      const job = new CronJob(userAndReminderData[i].date, () =>
        sendEmailReminder(userAndReminderData[i])
      );
      job.start();
    }
  }
}

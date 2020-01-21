# sign-up-in-out-reminders-node
API/MongoDB side of app that allows sign up, sign in, sign out, and adding reminders that trigger at a set time.

Contained within this project is the API and database logic of this app containing endpoints which allow for sign up, sign in, sign out, and setting reminders.

Routes are created using ExpressJS. Security/validation on this end as well as data model development of the app is handled in @hapi/JoiJS.
Did my best to keep separation of concerns and DRY best practices by giving each function one duty in addition to layering services and middleware.
Logins are protected using JWT to identify users.
Reminders are received as requests from the client-side and once entered into the database a CronJob immediately gets set to notify at the date/time specified in the reminder object. Upon the user logging out or the API stopping, reminders currently in the database have a CronJob launched on them then the user logs in.
Notifications by SMS are handled using Twilio and notifications by email are handled using @sendgrid/mail. This API receives notification preferences on each individual reminder.

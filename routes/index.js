const router = require("express").Router();
const usersRoutes = require("./users.routes.js");
const remindersRoutes = require("./reminders.routes.js");

// APIs
router.use("/api/users", usersRoutes);
router.use("/api/reminders", remindersRoutes);

module.exports = router;

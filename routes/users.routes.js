const router = require("express").Router();
const usersController = require("../controllers/users.controllers.js");
const user = require("../models/users.models.js");
const validateBody = require("../helpers/validate.js");
const authenticate = require("../helpers/authenticate.js");

// Routes
router.post(
  "/register",
  validateBody(user.registerSchema),
  usersController.register
);
router.post("/login", validateBody(user.signInSchema), usersController.signIn);
router.get('/verify', usersController.verifyUser);

// Auth Routes
router.use(authenticate);
router.post("/logout", usersController.signOut);
router.get("/:id([0-9a-fA-F]{24})", usersController.readUserById);

module.exports = router;

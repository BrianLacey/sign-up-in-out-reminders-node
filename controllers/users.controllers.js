const usersService = require("../services/users.service.js");
const userManagers = require("../managers/userManagers.js");
const reminderManagers = require("../managers/reminderManagers.js");
const jwt = require("jsonwebtoken");

module.exports = {
  register: register,
  signIn: signIn,
  signOut: signOut,
  readUserById: readUserById
};

async function register(req, res) {
  try {
    const emailAlreadyExists = await usersService.readByEmail(req.model.email);
    const userNameAlreadyExists = await usersService.readByUserName(
      req.model.userName
    );
    if (emailAlreadyExists || userNameAlreadyExists) {
      res.status(400).send("User already exists");
    } else {
      usersService
        .register(req.model)
        .then(() => {
          res.status(201).send("Successfully registered!");
        })
        .catch(err => {
          res.status(400).json(err.message);
        });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function signIn(req, res) {
  try {
    let user = await userManagers.signInHelper(req.model);
    if (!user) {
      res.status(401).send("There was an error with the login");
    } else {
      id = user._id.toString();
      const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXP
      });
      res
        .status(200)
        .cookie("Auth", token)
        .json("You're successfully signed in!");
        reminderManagers.dbRemindersCronjobs(id)
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

function signOut(req, res) {
  return res
    .status(200)
    .clearCookie("Auth")
    .json("Signed out!");
}

function readUserById(req, res) {
  usersService
    .readUserById(req.params.id)
    .then(result => {
      const user = userManagers.userDataObject(result);
      res.status(200).json(user);
    })
    .catch(err => res.status(400).json(err.message));
}

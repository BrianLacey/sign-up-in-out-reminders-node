const usersService = require("../services/users.service.js");

function signInHelper(model) {
  if (model.email) {
    const email = model.email;
    return usersService.readByEmail(email);
  } else {
    const userName = model.userName;
    return usersService.readByUserName(userName);
  }
}

function userDataObject(data) {
  const user = {
    id: data._id,
    email: data.email,
    userName: data.userName,
    phoneNumber: data.phoneNumber
  };
  return user;
}

module.exports = { signInHelper: signInHelper, userDataObject: userDataObject };

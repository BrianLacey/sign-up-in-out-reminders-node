const db = require("../mongodb.js").db;
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  register: register,
  readByEmail: readByEmail,
  readByUserName: readByUserName,
  readUserById: readUserById
};

function register(model) {
  return db()
    .collection("users")
    .insertOne(model)
    .then(result => result.insertedId.toString());
}

function readByEmail(email) {
  return db()
    .collection("users")
    .findOne({ email: email })
    .then(result => result);
}

function readByUserName(userName) {
  return db()
    .collection("users")
    .findOne({ userName: userName })
    .then(result => result);
}

function readUserById(id) {
  return db()
    .collection("users")
    .findOne({ _id: new ObjectId(id) })
    .then(result => {
      result._id = result._id.toString();
      return result;
    });
}

const dotenv = require('dotenv').config()
const mongodb = require("./mongodb.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
const router = require('./routes');

const port = process.env.PORT || 8080;

mongodb
  .connectToMongo()
  .then(() => app.listen(port))
  .then(() => console.log(`Connected successfully on port ${port}!`))
  .catch(err => console.log(err));

//To parse cookies and the request body in JSON or URLEncoded format.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//To protect the API and allow requests to be accepted from the client.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credential", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("withCredentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cookie, x-access-token"
  );
  next();
});

app.use(router);

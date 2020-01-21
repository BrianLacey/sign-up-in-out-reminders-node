const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "thisApp";

let db = null;

const client = new MongoClient(url);

connectToMongo = () => {
  if (db !== null) {
    return Promise.resolve(db);
  }

  return client
    .connect()
    .then(() => {
      const _db = client.db(dbName);
      db = _db;
    })
    .catch(err => console.log(err));
};

module.exports = {
  connectToMongo,
  db: () => db
};

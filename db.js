const MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt-nodejs");
var url = "mongodb://localhost:27017/facerecognition";

module.exports = {
  getAllUsers: function (cb) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("facerecognition");
      dbo.collection("users").find({}).toArray(cb);
    });
  },
  findUserEmail: function (email, cb) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("facerecognition");
      dbo.collection("users").findOne({ email: email }, cb);
    });
  },
  findUserId: function (id, cb) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("facerecognition");
      dbo.collection("users").findOne({ _id: new ObjectId(id) }, cb);
    });
  },
  registerUser: function (user, cb) {
    bcrypt.hash(user.password, null, null, function (err, hash) {
      newUser = Object.assign(user, { password: hash, entries: 0 });
      MongoClient.connect(url, { useUnifiedTopology: true }, function (
        err,
        db
      ) {
        if (err) throw err;
        var dbo = db.db("facerecognition");
        dbo.collection("users").insertOne(newUser, cb);
      });
    });
  },
  updateEntries: function (user, cb) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("facerecognition");
      dbo
        .collection("users")
        .findOneAndUpdate({ _id: ObjectId(user._id) },{ $inc: { entries: 1 } },{ returnOriginal: false },cb);
    });
  },
};

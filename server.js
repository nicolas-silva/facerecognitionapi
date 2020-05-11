const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      passwrd: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      passwrd: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  secure: [
    {
      id: "956",
      hash: "",
      email: "john@gmail.com",
    },
  ],
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  //   bcrypt.compare(req.body.password, database.secure[0].hash, function (err, res) {
  //     // res == true
  //   });
  const user = req.body;
  if (
    user.email === database.users[0].email &&
    user.passwrd === database.users[0].passwrd
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("fail");
  }
});

app.post("/register", (req, res) => {
  const { email, name, passwrd } = req.body;
  if (email !== '' && name !== '' && passwrd !== '') {
    bcrypt.hash(passwrd, null, null, function (err, hash) {
      console.log(hash);
    });
    database.users.push({
      id: "125",
      name: name,
      email: email,
      entries: 0,
      joined: new Date(),
    });
    res.json(database.users[database.users.length - 1]);
  }
  else{
      res.status(400).json('invalid user');
  }
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(404).json("user not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("user not found");
  }
});

// // Load hash from your password DB.

// bcrypt.compare("veggies", hash, function (err, res) {
//   // res = false
// });

app.listen(3002, () => {
  console.log("Server running on http://localhost:3002");
});

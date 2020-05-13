const db = require("./db");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const users = require("./controllers/users");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => { users.handleUsers(res, db) });

app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post("/register", (req, res) => { register.handleRegister(req, res, db)});

app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db)});

app.put("/image", (req, res) => { profile.handleProfilePut(req, res, db)});

app.post("/image", (req, res) => { profile.handleImageAPI(req, res)});

app.listen(3002, () => {
  console.log("Server running on http://localhost:3002");
});

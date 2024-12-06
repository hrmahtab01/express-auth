const express = require("express");
const Dbconnect = require("./Dbconfig/dbconnect");
const User = require("./Model/Usermodel");
const app = express();
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
Dbconnect();
app.use(express.json());

app.post("/resister", async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    try {
      const user = await User.create({ name, email, password: hash });
      res.status(201).send("user creatte successfully");
    } catch (error) {
      res.status(400).send(error);
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("user not found");
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(400).send(err);
      }
      if (result) {
        res.status(200).send("Login successfully");
      } else {
        res.status(400).send("invalid email and password   ");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running port number ${process.env.PORT}`);
});

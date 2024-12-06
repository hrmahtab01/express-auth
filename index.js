const express = require("express");
const Dbconnect = require("./Dbconfig/dbconnect");
const User = require("./Model/Usermodel");
const app = express();
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const UserMiddleware = require("./Middleware/UserMiddleware");
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
      const token = jwt.sign({ email }, process.env.PRV_TOKEN , { expiresIn: "1h" });
        console.log(token);
        
        res.status(200).send({msg:"Login successfully" ,token});
      } else {
        res.status(400).send({ msg: "invalid password or email",  });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/allusers",UserMiddleware, async (req , res)=>{
  try {
    const user = await User.find({})
    return res.status(200).send({user , msg:"get all user successfully"})
  } catch (error) {
    
  }
})
app.listen(process.env.PORT, () => {
  console.log(`server is running port number ${process.env.PORT}`);
});

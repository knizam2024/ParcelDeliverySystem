const express = require("express");
const router = express.Router();
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

//REGISTRATION

router.post("/register", async (req, res) => {
  const newUser = User({
    fullname: req.body.fullname,
    email: req.body.email,
    age: req.body.age,
    country: req.body.country,
    address: req.body.address,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", (req, res) => {
try {
    const user =  await User.findOne({email:req.body.email})
    if(!user){
        return res.status(401).json("You are not registered")
    }
    const hashedPassword = CryptoJs.AES.decrypt(
        user.password,
        process.env.PASS
    )
} catch (error) {
    
}

});

module.exports = router;

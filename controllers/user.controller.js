const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const User = require("../models/User");


exports.signup = async(req, res)=>{
  const {username, password} = req.body
  try {
          const user = await User.findOne({username})
          if(user){
            res.status(400).send({
              errors: [
                { msg: "Try with another username, it's already used! " },
              ],
            });
          }
           const newUser = new User({ ...req.body });
           const hashedPassword = await bcrypt.hashSync(password, saltRounds);
           newUser.password = hashedPassword;
           const token = jwt.sign(
             {
               id: newUser._id,
             },
             process.env.SECRET_KEY,
             { expiresIn: "3 days" }
           );
           await newUser.save();
           res.status(200).send({
             success: [{ msg: "Account created successfully!" }],
             user: newUser,
             token,
           });
  } catch (error) {
    console.log(error)
    res.status(400).send({
    errors: [{ msg: "Account can't be created!" }],
    });  
  }
};


exports.signin = async(req, res)=>{
  const {username, password} = req.body
  try {
    //   test if username exists
    const findUser = await User.findOne({ username });
    // if it isn't exited
    // bad credential
    if (!findUser) {
      return res.status(400).send({ errors: [{ msg: "bad credential" }] });
    }
    // test password
    //   password in BD== password
    const comparePass = await bcrypt.compare(password, findUser.password);
    //   they r not equal
    // bad crential
    if (!comparePass) {
      return res.status(400).send({ errors: [{ msg: "bad credential" }] });
    }
    //creat to token==key
    const token = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3 days" }
    );
    res.status(200).send({
      success: [{ msg: "Login successfully" }],
      user: findUser,
      token,
    });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "login failed" }] });
  }
};

 
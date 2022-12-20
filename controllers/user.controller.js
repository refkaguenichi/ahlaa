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


exports.getAllUsers = async(req, res)=>{

  try {
    const users = await User.find()
    res.status(200).send({
      success: [{ msg: "Users list!" }],
      users
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
    errors: [{ msg: error.message }],
    });  
  }
};

exports.getOneUser = async(req, res)=>{
  const {id}=req.params
  try {
    const user = await User.findOne({_id:id})
    res.status(200).send({
      success: [{ msg: "User found with success" }],
      user
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
    errors: [{ msg: error.message }],
    });  
  }
};

exports.updateUser = async(req, res)=>{
  let hashedPassword
  const {id}=req.params
  try {
    if(req.body.password)
    {
      hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);
    }
    const user = await User.updateOne({_id:id}, {...req.body, password:hashedPassword})
    res.status(200).send({
      success: [{ msg: "User updated with success" }],
      user
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
    errors: [{ msg: error.message }],
    });  
  }
};

exports.deleteUser = async(req, res)=>{
  const {id}=req.params
  try {
    await User.deleteOne({_id:id})
    res.status(200).send({
      success: [{ msg: "User deleted with success" }]
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({
    errors: [{ msg: error.message }],
    });  
  }
};
 
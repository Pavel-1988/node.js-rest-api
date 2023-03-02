const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { Conflict } = require("http-errors");
const { Unauthorized } = require("http-errors");

const {User} = require('../models/userModel')
const { ctrlWrapper } = require("../helpers/ctrlWrapper");



const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const userMail = await User.findOne({ email });
  if (userMail) {
    throw new Conflict(`Email "${email}" in use`);
  }
   await User.create({
    email,
    password: await bcrypt.hash(password, 10),
    subscription,
  });
   res.status(201).json({
      status: "success",
      code: 201,
      user: {
        email,
        subscription,
      },
   });

 }

const login = async (req, res) => {
  const { email, password, } = req.body;

  const user = await User.findOne({ email, });
  if (!user) {
    throw new Unauthorized("Email is wrong");
  }

  const passwordCompare = await  bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new Unauthorized("Password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: '1d' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        token,
        email,
        subscription: user.subscription,
      },
    }
   });
}


module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),

}
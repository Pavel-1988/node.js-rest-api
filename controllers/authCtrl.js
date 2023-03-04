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
  const token = jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: '23h' });
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

const getCurrent = async (req, res) => {
  const {  email, subscription  } = req.user;
   res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription
      },
    },
  });
}

const patchSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await Contacts.findByIdAndUpdate(_id, {subscription}, {new: true});
   if (!result) {
      res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found`,
    });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      subscription: result.subscription,
    },
  });
}

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({});
}

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  patchSubscription: ctrlWrapper(patchSubscription),

}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = process.env;

const { User } = require('../../models/userModel');
const { ctrlWrapper, HttpError } = require("../../helpers");



const login = async (req, res) => {
  const { email, password, } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401,"Email is wrong");
  }

  if (!user.verify) {
    throw new HttpError(401, "User not found");
  }

  const passwordCompare = await  bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401,"Password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload,JWT_SECRET, { expiresIn: '23h' });
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

module.exports = ctrlWrapper(login)
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");


const { BASE_URL } = process.env;
const { User } = require('../../models/userModel');
const { ctrlWrapper, sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const userMail = await User.findOne({ email });
  if (userMail) {
    throw new Conflict(`Email "${email}" in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email)
  const verificationToken = v4();

   await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken
   });
  
  const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`
  };
  

  await sendEmail(verifyEmail)
  
   res.status(201).json({
      status: "success",
      code: 201,
      user: {
        email,
        subscription,
        avatarURL,
      },
   });

}

module.exports = ctrlWrapper(signup)


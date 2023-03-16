
const { BASE_URL } = process.env;
const { User } = require('../../models/userModel');
const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");


const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401,"Email not found");
  }
  if (user.verify) {
    throw new HttpError(400,"Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
  };

  await sendEmail(verifyEmail)

  res.json({
    message: "Verification email sent",
    status: "success",
    code: 200,
  });

}

module.exports = ctrlWrapper(resendVerifyEmail)
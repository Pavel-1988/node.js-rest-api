const { User } = require('../../models/userModel');
const { ctrlWrapper, HttpError  } = require("../../helpers");


const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
     throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

  res.json({
    status: "success",
    code: 200,
    message: "Verification successful"
  })
}

module.exports = ctrlWrapper(verifyEmail)
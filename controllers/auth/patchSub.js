const { User } = require('../../models/userModel');
const { ctrlWrapper, HttpError } = require("../../helpers");


const patchSub = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
  if (!result) {
     throw new HttpError(404,"Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      subscription: result.subscription,
    },
  });
}

module.exports = ctrlWrapper(patchSub)
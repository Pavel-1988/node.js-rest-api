const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require('../../models/userModel');
const { ctrlWrapper } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

   Jimp.read(resultUpload)
      .then((img) => {
        return img.resize(250, 250).write(resultUpload);
      })
      .catch((error) => {
        throw error;
      });
  
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL })
  
  res.json({
    avatarURL,
  })
}
 
module.exports = ctrlWrapper(updateAvatar)
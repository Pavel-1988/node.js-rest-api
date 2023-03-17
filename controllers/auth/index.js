const signup = require("./signup");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const login = require("./login");
const getCurrent = require("./getCurrent");
const patchSub = require("./patchSub");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");

module.exports = {
  signup,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  patchSub,
  logout,
  updateAvatar
};
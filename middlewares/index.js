const validateBody = require("./validateBody")
const auth = require("./auth");
const isValidId = require("./isValidId");
const upload = require("./upload")
const requiredFieldsValidate = require("./requiredFieldsValidate")

module.exports = {
  auth,
  isValidId,
  requiredFieldsValidate,
  upload,
  validateBody
};
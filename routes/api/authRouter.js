const {
  // signup,
  login,
  getCurrent,
  logout,
  patchSub,
  updateAvatar,
  // verifyEmail,
  // resendVerifyEmail
} = require("../../controllers/authCtrl");

const ctrl =  require("../../controllers/auth")

const { requiredFieldsValidate,auth, upload, validateBody } = require('../../middlewares');
const {regLogSchema, patchSubSchema, emailSchema} = require('../../models/userModel')

const express = require('express')
const router = express.Router()


router.post('/signup', requiredFieldsValidate(regLogSchema), ctrl.signup)

router.get("/verify/:verificationToken", ctrl.verifyEmail)

router.post("/verify", validateBody(emailSchema), ctrl.resendVerifyEmail)

router.post('/login', requiredFieldsValidate(regLogSchema), login )

router.get('/current', auth ,  getCurrent)

router.get('/logout', auth, logout)

router.patch('/:id/subscription', auth, requiredFieldsValidate(patchSubSchema), patchSub)

router.patch("/avatars", auth, upload.single("avatar"), updateAvatar)



module.exports = router
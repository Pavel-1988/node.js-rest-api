const {
  // signup,
  // login,
  // getCurrent,
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

router.post('/login', requiredFieldsValidate(regLogSchema), ctrl.login )

router.get('/current', auth ,  ctrl.getCurrent)

router.get('/logout', auth, ctrl.logout)

router.patch('/:id/subscription', auth, requiredFieldsValidate(patchSubSchema), ctrl.patchSub)

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar)



module.exports = router
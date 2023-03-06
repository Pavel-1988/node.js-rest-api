const {
  signup,
  login,
  getCurrent,
  logout,
  patchSub
} = require("../../controllers/authCtrl");

const { requiredFieldsValidate,auth } = require('../../middlewares');
const {regLogSchema, patchSubSchema} = require('../../models/userModel')

const express = require('express')
const router = express.Router()


router.post('/signup', requiredFieldsValidate(regLogSchema), signup )

router.post('/login', requiredFieldsValidate(regLogSchema), login )

router.get('/current', auth ,  getCurrent)

router.get('/logout', auth, logout)

router.patch('/:id/subscription', auth, requiredFieldsValidate(patchSubSchema), patchSub)

module.exports = router
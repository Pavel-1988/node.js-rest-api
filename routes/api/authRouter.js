const {
  signup,
  login,
  getCurrent,
  logout
} = require("../../controllers/authCtrl");

const { requiredFieldsValidate,auth } = require('../../middlewares');
const {regLogSchema} = require('../../models/userModel')

const express = require('express')
const router = express.Router()


router.post('/signup', requiredFieldsValidate(regLogSchema), signup )

router.post('/login', requiredFieldsValidate(regLogSchema), login )


router.get('/current', auth ,  getCurrent)

router.post('/logout', auth,  logout)

module.exports = router
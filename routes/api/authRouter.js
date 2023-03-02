const {
  signup,
  login
} = require("../../controllers/authCtrl");

const { requiredFieldsValidate } = require('../../middlewares/usersValidateSchema');
const {regLogShema} = require('../../models/userModel')

const express = require('express')
const router = express.Router()


router.post('/signup', requiredFieldsValidate(regLogShema), signup )

router.post('/login', requiredFieldsValidate(regLogShema), login )

router.get('/logout',  )

router.get('/current', )



module.exports = router
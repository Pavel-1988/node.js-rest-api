const {
  signup,
  login
} = require("../../controllers/authCtrl");

const { joiValidateSchema } = require('../../middlewares/validateSchema');
const {signupValidation} = require('../../schemas/validationsUsers')

const express = require('express')
const router = express.Router()


router.post('/signup', joiValidateSchema(signupValidation), signup )

router.post('/login', joiValidateSchema(signupValidation), login )

router.get('/logout',  )

router.get('/current', )



module.exports = router
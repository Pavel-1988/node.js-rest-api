const Joi = require('joi');

const signupValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });

  

  return schema.validate(data)
}

module.exports ={signupValidation}
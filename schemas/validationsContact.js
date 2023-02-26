const Joi = require('joi');

const addContactValidation = (data) => {
  const shema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    favorite: Joi.boolean().optional(),
  });
  return shema.validate(data)
}

const updateContactValidation = (data) => {
  const shema = Joi.object({
    name: Joi.string().min(3).optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    favorite: Joi.boolean().optional(),
  });
  return shema.validate(data)
}

module.exports ={addContactValidation, updateContactValidation}
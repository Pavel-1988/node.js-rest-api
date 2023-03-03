const { Schema, model } = require("mongoose"); 
const Joi = require('joi');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
)

const addContactSchema = (data) => {
  const shema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    favorite: Joi.boolean().optional(),
  });
  return shema.validate(data)
}

const updateContactSchema = (data) => {
  const shema = Joi.object({
    name: Joi.string().min(3).optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    favorite: Joi.boolean().optional(),
  });
  return shema.validate(data)
}

const favoriteContactSchema = (data) => {
  const shema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  return shema.validate(data)
}



const Contacts = model('contact', contactSchema);

module.exports = {
  Contacts,
  addContactSchema,
  updateContactSchema,
  favoriteContactSchema
};
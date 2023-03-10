const { Schema, model } = require("mongoose");
const Joi = require('joi');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
     avatarURL: {
      type: String,
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
)

const regLogSchema = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(data)
}
const patchSubSchema = (data) => {
  const schema = Joi.object({
    subscription: Joi.string().required(),
  });
  return schema.validate(data)
}

const User = model('user', userSchema);


module.exports = {
  User,
  regLogSchema,
  patchSubSchema
};
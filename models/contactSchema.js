const { Schema, model } = require("mongoose"); 

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
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: 'user',
    //   required: true,
    // }
  },
  { versionKey: false, timestamps: true }
)

const Contacts = model('contact', contactSchema);

module.exports = Contacts;
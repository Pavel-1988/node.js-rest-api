

const contactModels = require("../models/contacts")

const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const {addContactValidation, updateContactValidation} = require("../schemas/validationsContact")

const listContacts = async (req, res) => {
  const contacts = await contactModels.listContacts();
  res.json({
      status: "success",
      code: 200,
      message: "Contacts FOUND",
      data: {
        contacts,
      },
  });
}

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactModels.getContactById(id);
    if (!result) {
        res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} NOT FOUND`,
      });
      return;
    }
  res.json({
      status: "success",
      code: 200,
      message: `Contact with id=${id} found`,
      data: {
        result,
      },
    });
}

const addContact = async (req, res) => {
  const { error } = addContactValidation(req.body);
  if (error) {
      res.status(400).json({
      status: "error",
      code: 400,
      message:"missing required name field",
      });
      return;
  }
  const result = await contactModels.addContact(req.body);
  res.status(201).json({
      status: "success",
      code: 201,
      message: `ADD new contact`,
      data: {
        result,
      },
     })
}

const updateContact = async (req, res) => {
  const { error } = updateContactValidation(req.body);
  if (error) {
    res.status(400).json({
    status: "error",
    code: 400,
    message:"missing fields",
    });
    return;
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "missing All fields"
    });
  }
  const { id } = req.params;
  const result = await contactModels.updateContact(id, req.body);
   if (!result) {
          res.status(404).json({
          status: "error",
          code: 404,
          message: `Not found`,
      });
      return;
  }
  res.json({
      status: "success",
      code: 200,
      message: `Changes with id=${id} done`,
      data: {
        result,
      },
    });

}

const removeContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactModels.removeContact(id);
  if (!deletedContact) {
        res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} NOT FOUND`,
      });
      return;
  }
  res.json({
      status: "success",
      code: 200,
      message: `Contact with id=${id} deleted`,
      data: {
        deletedContact,
      },
    })
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
}
const {Contacts} = require('../models/contactModel')
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const {addContactSchema, updateContactSchema, favoriteContactSchema} = require("../models/contactModel")

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contacts.find(
    favorite ? { owner: _id, favorite } : { owner: _id },
    "-createdAt, -updatedAt", { skip, limit: Number(limit) }).populate("owner", "_id email");
  const quntityContacts = result.length
  res.json({
      status: "success",
      code: 200,
      message: ` ${quntityContacts}  Contacts FOUND`,
      data: {
        result,
      },
  });
}

const getById = async (req, res) => {
  const { id } = req.params;
  const result =  await Contacts.findById(id);
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

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = addContactSchema(req.body);
  if (error) {
      res.status(400).json({
      status: "error",
      code: 400,
      message:"missing required  field",
      });
      return;
  }
  const result = await Contacts.create({...req.body,owner});
  res.status(201).json({
      status: "success",
      code: 201,
      message: `ADD new contact`,
      data: {
        result,
      },
     })
}

const updateById = async (req, res) => {
  const { error } = updateContactSchema(req.body);
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
      message: "missing  fields"
    });
  }
  const { id } = req.params;
  const result = await Contacts.findByIdAndUpdate(id, req.body, {new: true});
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

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contacts.findByIdAndRemove(id);
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

const patchFavorite = async (req, res) => {
  const { error } = favoriteContactSchema(req.body);
  if (error) {
    res.status(400).json({
    status: "error",
    code: 400,
    message:"missing fields favorite",
    });
    return;
  }

    if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "missing  fields"
    });
  }

  const { id  } = req.params;
  const result = await Contacts.findByIdAndUpdate(id, req.body, {new: true});
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

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  patchFavorite: ctrlWrapper(patchFavorite),
}
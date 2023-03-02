const {Contacts} = require('../models/contactModel')
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
// const {addContactValidation, updateContactValidation, favoriteContactValidation} = require("../schemas/validationsContact")

const getAll = async (req, res) => {
  const result = await Contacts.find({}, "-createdAt, -updatedAt");
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
  // const { error } = addContactValidation(req.body);
  // if (error) {
  //     res.status(400).json({
  //     status: "error",
  //     code: 400,
  //     message:"missing required name field",
  //     });
  //     return;
  // }
  const result = await Contacts.create(req.body);
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
  // const { error } = updateContactValidation(req.body);
  // if (error) {
  //   res.status(400).json({
  //   status: "error",
  //   code: 400,
  //   message:"missing fields",
  //   });
  //   return;
  // }

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
  // const { error } = favoriteContactValidation(req.body);
  // if (error) {
  //   res.status(400).json({
  //   status: "error",
  //   code: 400,
  //   message:"missing fields favorite",
  //   });
  //   return;
  // }

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
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require("../../models/contacts");

const {addContactValidation, updateContactValidation} =require("../../validations/validationsContact")

const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
      res.json({
          status: "success",
          code: 200,
          message: "Contacts FOUND",
          data: {
            contacts,
          },
      });
  } catch (err) {
    next(err);
  } 
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
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
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  const { error } = addContactValidation(req.body);
  if (error) {
      res.status(400).json({
      status: "error",
      code: 400,
      message:"missing required name field",
      });
      return;
  }
  try {
    const result = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: `ADD new contact`,
      data: {
        result,
      },
     })
  }catch (err) {
    next(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);
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
  } catch (err) {
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
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
  
  try { 
    const { id } = req.params;
    const result = await updateContact(id, req.body);
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
  }catch (err) {
    next(err);
  }
})

module.exports = router

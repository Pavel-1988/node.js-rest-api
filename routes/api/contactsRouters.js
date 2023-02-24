const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require("../../controllers/contacts");


const express = require('express')
const router = express.Router()

router.get('/', listContacts )

router.get('/:id', getContactById)

router.post('/', addContact )

router.delete('/:id', removeContact )

router.put('/:id', )

module.exports = router

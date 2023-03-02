const {
  getAll,
  getById,
  deleteById,
  add,
  updateById,
  patchFavorite
} = require("../../controllers/contactsCtrl");

const { isValidId } = require('../../middlewares/isValidId')
const { addContactValidate, updateContactValidate, patchFavoriteValidate } = require('../../middlewares/contactsValidateSchema');
const {addContactSchema, updateContactSchema, favoriteContactSchema} = require('../../models/contactModel')

const express = require('express')
const router = express.Router()

router.get('/', getAll )

router.get('/:id',isValidId, getById)

router.post('/', addContactValidate (addContactSchema), add )

router.delete('/:id', isValidId, deleteById )

router.put('/:id', isValidId, updateContactValidate(updateContactSchema), updateById)

router.patch('/:id/favorite', patchFavoriteValidate(favoriteContactSchema), patchFavorite )

module.exports = router

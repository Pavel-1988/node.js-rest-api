const {
  getAll,
  getById,
  deleteById,
  add,
  updateById,
  patchFavorite
} = require("../../controllers/contactsCtrl");

const { isValidId, auth } = require('../../middlewares/')


// const { addContactValidate, updateContactValidate, patchFavoriteValidate } = require('../../middlewares/contactsValidateSchema');
// const {addContactSchema, updateContactSchema, favoriteContactSchema} = require('../../models/contactModel')

const express = require('express')
const router = express.Router()

router.get('/', auth, getAll )

router.get('/:id',  auth, isValidId, getById)

router.post('/', auth, add);
// router.post('/', addContactValidate(addContactSchema), add);

router.delete('/:id',auth, isValidId, deleteById )

router.put('/:id', isValidId, updateById)
// router.put('/:id', isValidId, updateContactValidate(updateContactSchema), updateById)

router.patch('/:id/favorite', patchFavorite)
// router.patch('/:id/favorite', patchFavoriteValidate(favoriteContactSchema), patchFavorite )

module.exports = router

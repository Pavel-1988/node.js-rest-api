const {
  getAll,
  getById,
  deleteById,
  add,
  updateById,
  patchFavorite
} = require("../../controllers/contactsCtrl");

const {isValidId} = require('../../middlewares/isValidId')

const express = require('express')
const router = express.Router()

router.get('/', getAll )

router.get('/:id',isValidId, getById)

router.post('/', add )

router.delete('/:id', isValidId, deleteById )

router.put('/:id', isValidId, updateById)

router.patch('/:id/favorite', patchFavorite )

module.exports = router

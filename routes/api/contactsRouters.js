const {
  getAll,
  getById,
  deleteById,
  add,
  updateById,
  patchById
} = require("../../controllers/contactsCtrl");

const {isValidId} = require('../../middlewares/isValidId')

const express = require('express')
const router = express.Router()

router.get('/', getAll )

router.get('/:id',isValidId, getById)

router.post('/', add )

router.delete('/:id', deleteById )

router.put('/:id', updateById)

router.patch('/:id/favorite', patchById )

module.exports = router

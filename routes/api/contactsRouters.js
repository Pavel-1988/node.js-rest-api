const {
  getAll,
  getById,
  deleteById,
  add,
  updateById,
  patchById
} = require("../../controllers/contactsCtrl");


const express = require('express')
const router = express.Router()

router.get('/', getAll )

router.get('/:id', getById)

router.post('/', add )

router.delete('/:id', deleteById )

router.put('/:id', updateById)

router.patch('/:id/favorite', patchById )

module.exports = router

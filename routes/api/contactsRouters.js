const {
  getAll,
  getById,
  deleteById,
  add,
  updateById
} = require("../../controllers/contacts");


const express = require('express')
const router = express.Router()

router.get('/', getAll )

router.get('/:id', getById)

router.post('/', add )

router.delete('/:id', deleteById )

router.put('/:id', updateById )

module.exports = router

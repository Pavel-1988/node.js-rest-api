const {
  getAll,
  getById,
  deleteById,
  add,
  updateById,
  patchFavorite
} = require("../../controllers/contactsCtrl");

const { isValidId, auth } = require('../../middlewares/')


const express = require('express')
const router = express.Router()

router.get('/', auth, getAll )

router.get('/:id',  auth, isValidId, getById)

router.post('/', auth, add);

router.delete('/:id',auth, isValidId, deleteById )

router.put('/:id', isValidId, updateById)

router.patch('/:id/favorite', patchFavorite)


module.exports = router

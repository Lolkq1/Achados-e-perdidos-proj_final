const express = require('express')
const router = express.Router()
const {postObjeto, deleteObjeto, putObjeto} = require('../controllers/ObjetoController')

router.post('/', postObjeto)
router.delete('/:id', deleteObjeto)
router.put('/:id', putObjeto)
module.exports = router
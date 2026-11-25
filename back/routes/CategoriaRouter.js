const express = require('express')
const router = express.Router()
const {postCategoria, deletarCategoria, putCategoria, getCategorias} = require('../controllers/CategoriaController')

router.get('/', getCategorias)
router.post('/', postCategoria)
router.put('/:id', putCategoria)
router.delete('/:id', deletarCategoria)

module.exports = router
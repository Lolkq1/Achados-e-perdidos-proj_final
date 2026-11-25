const express = require('express')
const router = express.Router()
let {dynamicCategoriaEditar, dynamicCategoria, dynamicCategoriaCriacao} = require('../controllers/CategoriaController')
router.get('/categorias/', dynamicCategoria)
router.get('/categoria/', dynamicCategoriaCriacao)
router.get('/categoriaedit/:id', dynamicCategoriaEditar)
module.exports = router
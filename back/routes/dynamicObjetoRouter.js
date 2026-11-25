const express = require('express')
const router = express.Router()
let {dynamicObjetos, dynamicObjetoCriacao, dynamicObjetoEditar} = require('../controllers/ObjetoController')
router.get('/objetos/', dynamicObjetos)
router.get('/objeto/', dynamicObjetoCriacao)
router.get('/objetoedit/:id', dynamicObjetoEditar)
module.exports = router
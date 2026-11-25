const express = require('express')
const router = express.Router()
let {dynamicEtiquetaEditar, dynamicEtiqueta, dynamicEtiquetaCriacao} = require('../controllers/EtiquetaController')
router.get('/etiqueta/', dynamicEtiquetaCriacao)
router.get('/etiquetas/', dynamicEtiqueta)
router.get('/etiquetaedit/:id', dynamicEtiquetaEditar)
module.exports = router
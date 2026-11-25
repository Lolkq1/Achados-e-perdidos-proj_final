const express = require('express')
const router = express.Router()
const {postEtiqueta, deleteEtiqueta, putEtiqueta, getEtiquetas} = require('../controllers/EtiquetaController')

router.get('/', getEtiquetas)
router.post('/', postEtiqueta)
router.put('/:id', putEtiqueta)
router.delete('/:id', deleteEtiqueta)

module.exports = router
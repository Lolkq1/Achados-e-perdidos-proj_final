const express = require('express');
const router = express.Router();

const {cadastrarEtiqueta,getEtiqueta,getEtiquetaById,putEtiqueta,deleteEtiqueta} = require('../controllers/EtiquetaController')

router.post('/', cadastrarEtiqueta);
router.get('/', getEtiqueta);
router.get('/:id', getEtiquetaById);
router.put('/:id', putEtiqueta);
router.delete('/:id', deleteEtiqueta);

module.exports = router;
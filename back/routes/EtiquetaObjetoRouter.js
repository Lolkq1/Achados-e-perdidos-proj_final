const express = require('express');
const router = express.Router();

const {cadastrarEtiquetaObjeto,getEtiquetaObjeto,getEtiquetaObjetoById,getEtiquetaObjetoByEtiqueta,getEtiquetaObjetoByObjeto,putEtiquetaObjeto,deleteEtiquetaObjeto} = require('../controllers/EtiquetaObjetoController')

router.post('/', cadastrarEtiquetaObjeto);
router.get('/', getEtiquetaObjeto);
router.get('/etiqueta/:id_etiqueta', getEtiquetaObjetoByEtiqueta)
router.get('/objeto/:id_objeto', getEtiquetaObjetoByObjeto)
router.get('/:id', getEtiquetaObjetoById);
router.put('/:id', putEtiquetaObjeto);
router.delete('/:id', deleteEtiquetaObjeto);

module.exports = router;
const express = require('express');
const router = express.Router();

const {cadastrarObjeto,getObjeto,getObjetoById,putObjeto,deleteObjeto} = require('../controllers/ObjetoController')

router.post('/', cadastrarObjeto);
router.get('/', getObjeto);
router.get('/:id', getObjetoById);
router.put('/:id', putObjeto);
router.delete('/:id', deleteObjeto)

module.exports = router;
const express = require('express')
const router = express.Router()
const {getLocaispBloco, getLocais, getBlocos, postLocal, deleteLocal, putLocal} = require('../controllers/LocalController')

router.get('/:bloco', getLocaispBloco)
router.get('/blocos', getBlocos)
router.get('/', getLocais)
router.post('/', postLocal)
router.put('/:id', putLocal)
router.delete('/:id', deleteLocal)

module.exports = router
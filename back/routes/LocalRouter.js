const express = require('express')
const router = express.Router()
const {
    getLocaispBloco,
    getLocais,
    getBlocos,
    postLocal,
    deleteLocal,
    putLocal
} = require('../controllers/LocalController')

router.get('/blocos', getBlocos)
router.get('/:bloco', getLocaispBloco)
router.get('/', getLocais)
router.post('/', postLocal)
router.put('/:id', putLocal)
router.delete('/:id', deleteLocal)

module.exports = router
const express = require('express')
const router = express.Router()

const {
    getLocaispBloco,
    listarLocais,
    criarLocal,
    atualizarLocal,
    deletarLocal
} = require('../controllers/LocalController')

router.get('/', listarLocais)

router.get('/:bloco', getLocaispBloco)

router.post('/', criarLocal)

router.put('/:id', atualizarLocal)

router.delete('/:id', deletarLocal)

module.exports = router
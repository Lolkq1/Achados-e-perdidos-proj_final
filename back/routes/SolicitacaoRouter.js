const express = require('express')
const router = express.Router()
const {cadastrarSolicitacao, alterarSolicitacao, getSolicitacao, dynamicSolicitacoes, removerSolicitacao} = require('../controllers/SolicitacaoController')

router.get('/:id', getSolicitacao)
router.post('/', cadastrarSolicitacao)
router.put('/:id', alterarSolicitacao)
router.delete('/:id', removerSolicitacao)

module.exports = router 
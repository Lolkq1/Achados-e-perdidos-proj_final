const express = require('express')
const router = express.Router()
const {cadastrarSolicitacao, alterarSolicitacao, getSolicitacao, dynamicSolicitacoes, removerSolicitacao} = require('../controllers/SolicitacaoController')
const {auth, reverseAuth} = require('../middleware/auth')

router.get('/:id', auth, getSolicitacao)
router.post('/', auth, cadastrarSolicitacao)
router.patch('/:id', auth, alterarSolicitacao)
router.delete('/:id', auth, removerSolicitacao)

module.exports = router 
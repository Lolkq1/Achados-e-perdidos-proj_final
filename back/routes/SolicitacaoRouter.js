const express = require('express')
const router = express.Router()
const {cadastrarSolicitacao, alterarSolicitacao, getSolicitacao} = require('../controllers/SolicitacaoController')

router.get('/:id', getSolicitacao)
router.post('/', cadastrarSolicitacao)
router.patch('/:id', alterarSolicitacao)

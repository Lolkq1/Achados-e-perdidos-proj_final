const express = require('express')
const router = express.Router()
let {dynamicSolicitacoes, dynamicSolicitacaoEditar, dynamicSolicitacaoEntregas} = require('../controllers/SolicitacaoController')
router.get('/solicitacoes/:uid', dynamicSolicitacoes)
router.get('/solicitacoes/', dynamicSolicitacoes)
router.get('/solicitacaoedit/:id', dynamicSolicitacaoEditar)
router.get('/entregas/', dynamicSolicitacaoEntregas)
module.exports = router
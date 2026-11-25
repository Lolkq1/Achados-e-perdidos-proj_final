const express = require('express')
const router = express.Router()
let {dynamicSolicitacoes, dynamicSolicitacaoEditar} = require('../controllers/SolicitacaoController')
router.get('/solicitacoes/:uid', dynamicSolicitacoes)
router.get('/solicitacoes/', dynamicSolicitacoes)
router.get('/solicitacaoedit/:id', dynamicSolicitacaoEditar)
module.exports = router